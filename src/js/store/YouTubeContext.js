import React, { Component } from 'react'
import Video from '@shared/models/Video.class';
import Template from '@shared/models/Template.class';
import Search from '@shared/models/Search.class';
import { copyDate } from '@utils/date';
import { sevenLastDays } from '@utils/date';
import { getAllUrlParams, setStateAsync, wait, randomId, TF_ERROR } from '@utils/index';
import { fetchHistory, fetchSearch, fetchPostVideos } from '@shared/api/Deputy';
import { getStorages, setStorage } from './BrowserStorage';
import { sendMessageToBackground } from '@utils/browser';

const newLastSevenDaysFlagged = lastSevenDaysflagged => sevenLastDays.map(elem => {
  const flaggedFounded = lastSevenDaysflagged.find(x => x.date === elem.date);
  return flaggedFounded ? {
    date: elem.date,
    videos: flaggedFounded.videos
  } : elem
})

export const YouTubeContext = React.createContext();

class YouTubeProvider extends Component {

  constructor(props) {
    super(props);

    this.notificationSystem = React.createRef();

    const { storage, youtubeDatasDeputy } = this.props

    this.state = { ...youtubeDatasDeputy }

    this.baseHide = {}

    this.state.videosDisplayed = youtubeDatasDeputy.videos // @array
    this.state.hideRemoved = this.baseHide.hideRemoved = false // @boolean
    this.state.hideReviewed = this.baseHide.hideReviewed = false // @boolean
    this.state.theme = storage.theme // light / dark
    this.state.lastSearches = storage.lastSearches // @array
    this.state.isFetchingSlow = false // @boolean
    this.state.displaying = storage.displaying // row / column
    this.state.videosToFlag = storage.videosToFlag.map(e => new Video(e)) // @array
    this.state.watchedVideo = youtubeDatasDeputy.watchedVideo // @Video
    this.state.lastSevenDaysflagged = newLastSevenDaysFlagged(storage.lastSevenDaysflagged) // @array
    this.state.templates = storage.templates.map(elem => new Template(elem)) // @array
    this.state.searches = storage.searches.map(elem => new Search(elem)) // @array
    this.state.modal = { type: null, isOpen: false } // @object
    this.state.notification = { id: null, type: null, params: {} } // @object
    this.state.fatalError = false // @boolean
    this.state.onToFlag = null // @boolean
  }

  selectItems(items = [], type, force = false) {
    let itemsDisplayed = [...this.state[type]];

    if (force && itemsDisplayed.filter(x => x.selected).length === itemsDisplayed.length) {
      for (let index = 0; index < itemsDisplayed.length; index++) {
        if (items.find(x => x.id === itemsDisplayed[index].id)) {
          itemsDisplayed[index].selected = false
        }
      }
    } else {
      for (let index = 0; index < itemsDisplayed.length; index++) {
        if (items.find(x => x.id === itemsDisplayed[index].id)) {
          itemsDisplayed[index].selected = force || !itemsDisplayed[index].selected
        }
      }
    }

    this.setState({
      [type]: itemsDisplayed
    });
  }

  async openModal(type, isOpen = true) {
    await setStateAsync({ modal: { type, isOpen }}, this)
  }

  async actionItem(arrayItems, type) {

    let items = this.state[type]

    for (let index = 0; index < arrayItems.length; index++) {
      const element = arrayItems[index]
      const itemIndex = items.findIndex(x => x.id === element.id)
      if (itemIndex >= 0) items = items.filter((e, i) => i !== itemIndex)
      else items.unshift(element)
    }

    await setStorage('sync', { [type]: items.map(e => ({ ...e, created: copyDate(e.created).toString()}))})
    await setStateAsync({ [type]: items }, this)
  }

  async removeVideosToFlag() {
    const videosToFlag = this.state.videosToFlag.filter(e => !e.selected)
    await setStateAsync({ videosToFlag, videosDisplayed: videosToFlag }, this)
    this.callbackState({videosToFlag})
    return videosToFlag
  }

  async getBrowserDatas() {
    await Promise.all([getStorages('sync')])
      .then(async storages => {
        const { templates, searches, lastSevenDaysflagged } = storages.reduce((a, d) => Object.assign(d, a), {})
        setStateAsync({
          templates: templates.map(elem => new Template(elem)),
          searches: searches.map(elem => new Search(elem)),
          lastSevenDaysflagged: newLastSevenDaysFlagged(lastSevenDaysflagged)
        }, this)
      })
      .catch(async () => {
        const fatalError = new TF_ERROR('ERROR_GET_STORAGE')
        await setStateAsync({ fatalError }, this)
      })
  }

  async getVideos(type, params) {
    try {
      if (type !== 'target') await setStateAsync({ isFetchingSlow: true }, this)
      let datasVideos = {} // videos / pagination
      if (type === 'history') { datasVideos = await fetchHistory(params) }
      else if (type === 'search') { datasVideos = await fetchSearch(params) }
      else if (type === 'target') {
        const { videosToFlag } = await getStorages('local')
        datasVideos = {
          videos: videosToFlag.map(e => new Video(e)),
          pagination: []
      }}

      await setStateAsync({
        ...datasVideos,
        videosDisplayed: datasVideos.videos,
        onToFlag: type === 'target'
      }, this)
      await wait(0)
    } catch (error) {
      const fatalError = error.id ? error : (error.message || 'Unknown error')
      await setStateAsync({ fatalError }, this)
    } finally {
      await setStateAsync({ isFetchingSlow: false }, this)
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (JSON.stringify(prevState.videos) !== JSON.stringify(this.state.videos)) {
      const videosDisplayed = this.state.videos.filter(video => {
        return this.state.hideReviewed ? !video.isReviewed : this.state.hideRemoved ? !video.isRemoved : true
      });
      return this.setState({videosDisplayed});
    }
  }

  filterVideos(type) {
    const hides = Object.assign({}, this.baseHide);
    const { videos } = this.state
    hides[type] = !this.state[type];

    const videosDisplayed = videos.filter(video => {
      return hides.hideReviewed ? !video.isReviewed : hides.hideRemoved ? !video.isRemoved : true
    });

    return this.setState({
      videosDisplayed,
      ...hides
    });
  }

  /**
   * Flag videos
   * Post to Deputy API
   * @param {Object} params - Params for fetching and add to storage
   */
  async flagVideos(params) {
    await setStateAsync({ isFetchingSlow: true, modal: { type: 'form-flagging', isOpen: false }}, this)
    try {
      await fetchPostVideos(params)
      const { lastSevenDaysflagged, templates, searches } = Object.assign({}, this.state)
      lastSevenDaysflagged[0].videos += params.videos.length

      if (params.templateId) {
        const templateIndex = templates.findIndex(x => x.id == params.templateId);
        if (templateIndex !== -1) {
          templates[templateIndex].nb_flagged += params.videos.length
          templates[templateIndex].nb_used++
        }
      }

      if (params.searchId) {
        const searchIndex = this.state.searches.findIndex(x => x.id == params.searchId)
        if (searchIndex !== -1) searches[searchIndex].flagged += params.videos.length
      }

      await setStateAsync( {
        lastSevenDaysflagged,
        templates,
        searches
      }, this)

      await setStorage('sync', {
        lastSevenDaysflagged,
        searches: searches.map(e => ({ ...e, created: copyDate(e.created).toString() })),
        templates: templates.map(e => ({ ...e, created: copyDate(e.created).toString() }))
      })

      return this.setState({
        notification: {
          id: randomId(),
          type: 'flaggedVideos',
          params: {
            level: 'success',
            message: `${params.videos.length} videos flagged !`
          }
        }
      })
    } catch (error) {
      return this.setState({
        notification: { id: randomId(), type: 'flaggedVideos', params: { level: 'error', message: 'An error occured' }},
        modal: { type: 'form-flagging', isOpen: true }
      })
    } finally {
      await setStateAsync({ isFetchingSlow: false }, this)
    }
  }

  async callbackState(updatedState) {
    if (updatedState.hasOwnProperty("displaying") || updatedState.hasOwnProperty("theme")) {
      setStorage('sync', {
        displaying: this.state.displaying,
        theme: this.state.theme
      })
    }

    if (updatedState.hasOwnProperty("videosToFlag") || updatedState.hasOwnProperty("lastSearches")) {
      await setStorage('local', {
        videosToFlag: this.state.videosToFlag,
        lastSearches: this.state.lastSearches
      })
      await sendMessageToBackground('updateBadgeText', { videosToFlag: this.state.videosToFlag })
    }
  }

  render() {
    if (this.state.fatalError) throw this.state.fatalError
    return (
      <YouTubeContext.Provider value={{
        state: this.state,
        getBrowserDatas: () => this.getBrowserDatas(),
        flagVideos: params => this.flagVideos(params),
        selectVideos: (videos = []) => this.selectItems(videos, 'videosDisplayed'),
        selectSearches: (searches = []) => this.selectItems(searches, 'searches'),
        selectAll: (type, force = true) => this.selectItems(this.state[type], type, force),
        filterVideos: type => this.filterVideos(type),
        addTemplate: (template = []) => this.actionItem(template, 'templates'),
        removeTemplate: (template = []) => this.actionItem(template, 'templates'),
        openModal: (type, isOpen = true) => this.openModal(type, isOpen),
        removeVideosToFlag: sendForme => this.removeVideosToFlag(sendForme),
        addSearch: (search = []) => this.actionItem(search, 'searches'),
        removeSearch: (search = []) => this.actionItem(search, 'searches'),
        setState: (object, callback) => this.setState(object, () => callback ? callback() : this.callbackState(object)),
        getVideos: (type = 'history', params = getAllUrlParams()) => this.getVideos(type, params)
      }}>{this.props.children}
      </YouTubeContext.Provider>
    )
  }
}

export default YouTubeProvider