import React from 'react'
import ReactDOM from 'react-dom';
import App from './components/App'
import getVideos from './getDom/_videos'
import getVideo from './getDom/_video'
import getSearch from './getDom/_search'
import getPathname from './getDom/_location'
import getPagination from './getDom/_pagination'
import getStatistics from './getDom/_statistics'
import getUser from './getDom/_user'
import { urlsAvailable } from './config/config';
import Template from './shared/models/Template.class'
import Search from './shared/models/Search.class'
import { wait, getUrlParameter, injectCss, getDateFormat, copyDate } from './utils/utils';
import Video from './shared/models/Video.class';

const style = [
  'background: linear-gradient(to right, #5433ff, #20bdff, #a5fecb);',
  'color: #fff',
  'padding: 10px 20px',
  'line-height: 35px'
].join(';');
console.log(`%cTF\'s Center on ${process.env.NODE_ENV} mode!`, style);

export const YouTubeContext = React.createContext();

function initExtension() {
  const sevenLastDays = Array(7).fill().map((e, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i);
    return {
      date: getDateFormat(date),
      videos: 0
    }
  });

  function fadeOutEffect(elem) {
    let fadeTarget = elem;
    let fadeEffect = setInterval(function () {
      if (!fadeTarget.style.opacity) {
        fadeTarget.style.opacity = 1;
      }
      if (fadeTarget.style.opacity > 0) {
        fadeTarget.style.opacity -= 0.1;
      } else {
        fadeTarget.style.display = 'none'
        clearInterval(fadeEffect);
      }
    }, 200);
  }

  document.getElementById("confirmBox") && fadeOutEffect(document.getElementById("confirmBox"));

  chrome.runtime.sendMessage({ type: 'showPageAction' });

  let storageDefault = {
    local: {
      videosToFlag: []
    },
    sync: {
      displaying: 'column',
      theme: 'light',
      templates: [],
      searches: [],
      lastSevenDaysflagged: [...sevenLastDays]
    }
  }

  let getStorages = (type) => new Promise((resolve, reject) => {
    if (!chrome.runtime.lastError) {
      chrome.storage[type].get(storageDefault[type], items => {
        resolve(items);
      })
    } else {
      reject('Error when loading storage ' + type)
    }
  });

  Promise.all([getStorages('local'), getStorages('sync')])
    .then(async storages => {
      const storage = storages.reduce((a, d) => Object.assign(d, a), {});

      const videoIdWatch = getUrlParameter('v');
      const pathname = getPathname()
      const myReactApp = document.createElement("div");


      // For /watch, website uses Angular and asynchrone injection, wait DOM ready
      if (pathname === '/watch') {
        while (!document.getElementById('info').querySelector('#top-level-buttons')) {
          await wait(50)
        }

        if (document.getElementById('info').querySelector('#button-flag-TF')) return;
      }

      let youTubeDatas = {
        pathname,
        videos: getVideos(),
        search: getSearch(),
        pagination: getPagination(),
        statistics: pathname === '/stats' ? getStatistics() : null,
        user: getUser(),
        videoIdWatch: videoIdWatch,
        videoWatched: pathname === '/watch' ? getVideo(videoIdWatch) : null,
      }

      if (pathname === '/watch') {
        myReactApp.setAttribute("id", "button-flag-TF");
        document.getElementById('info').querySelector('#top-level-buttons').appendChild(myReactApp);
      } else {
        myReactApp.setAttribute("id", "TFsCenter");
        document.getElementById('page-container').innerHTML = '';
        document.getElementById('page-container').appendChild(myReactApp);
        document.documentElement.setAttribute('data-theme', storage.theme)
        injectCss()
      }

      const lastSevenDaysflagged = sevenLastDays.map(elem => {
        const flaggedFounded = storage.lastSevenDaysflagged.find(x => x.date === elem.date);
        return flaggedFounded ? {
          date: elem.date,
          videos: flaggedFounded.videos
        } : elem
      })

      class YouTubeProvider extends React.Component {

        constructor() {
          super();
          this.state = youTubeDatas;
          this.baseHide = {}

          this.state.videosDisplayed = youTubeDatas.videos
          this.state.hideRemoved = this.baseHide.hideRemoved = false
          this.state.hideReviewed = this.baseHide.hideReviewed = false
          this.state.canFlag = youTubeDatas.pathname === urlsAvailable[1]
          this.state.popupReportingOpened = false
          this.state.theme = storage.theme
          this.state.displaying = storage.displaying
          this.state.videosToFlag = storage.videosToFlag.map(e => new Video(e))
          this.state.videoWatched = youTubeDatas.videoWatched
          this.state.lastSevenDaysflagged = lastSevenDaysflagged
          this.state.templates = storage.templates.map(elem => new Template(elem))
          this.state.searches = storage.searches.map(elem => new Search(elem))
          this.state.openModal = { type: null, isOpen: false }

          if (youTubeDatas.pathname === urlsAvailable[5]) {
            this.state.videosDisplayed = this.state.videosToFlag
            this.state.canFlag = true
            this.state.onToFlag = true
          }
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

        openModal(type, isOpen = true) {
          if (isOpen) {
            window.location.hash = `#${type}`
          } else {
            const noHashURL = window.location.href.replace(/#.*$/, '');
            window.history.replaceState('', document.title, noHashURL)
          }
          return this.setState({
            openModal: { type, isOpen }
          });
        }

        actionItem(arrayItems, type, callback) {

          let items = this.state[type];

          for (let index = 0; index < arrayItems.length; index++) {
            const element = arrayItems[index];
            let ItemIndex = items.findIndex(x => x.id === element.id)
            if (ItemIndex >= 0) {
              items = items.filter((e, i) => i !== ItemIndex);
            } else {
              items.unshift(element);
            }
          }

          return chrome.storage.sync.set({
            [type]: items.map(e => ({
              ...e,
              created: copyDate(e.created).toString()
            }))
          }, () => this.setState({
            [type]: items
          }, () => callback && callback()));
        }

        removeVideosToFlag(sendForm = false) {
          const listVideoToFlag = this.state.videosToFlag.filter(e => !e.selected)
          chrome.storage.local.set({
            videosToFlag: listVideoToFlag
          }, () => {
            chrome.runtime.sendMessage({ type: 'updateBadgeText', videosToFlag: listVideoToFlag  });
            if (sendForm) {
              document.getElementById('formFlagging').submit();
            } else {
              this.setState({
                videosDisplayed: listVideoToFlag
              })
            }
          })
        }

        filterVideos(type) {
          const hides = Object.assign({}, this.baseHide);
          const { videos } = this.state
          hides[type] = !this.state[type];

          let videosDisplayed = videos.filter(video => {
            return hides.hideReviewed ? !video.isReviewed : hides.hideRemoved ? !video.isRemoved : true
          });

          return this.setState({
            videosDisplayed,
            hideRemoved: hides.hideRemoved,
            hideReviewed: hides.hideReviewed,
          });
        }

        saveToStorage({type, name, value})  {
          return chrome.storage[type].set({
            [name]: value
          });
        }

        callbackState(name, value, stuff) {
          if (name === 'displaying' || name === 'theme') {
            return this.saveToStorage({ type: 'sync', name, value })
          } else if (name === 'lastSevenDaysflagged') {

            let { templates, searches } = this.state;

            if (stuff) {
              if (stuff.templateId) {
                let index = templates.findIndex(x => x.id == stuff.templateId);
                templates[index].nb_flagged += stuff.nb_flagged
                templates[index].nb_used++
              }
            }

            chrome.storage.sync.set({
              lastSevenDaysflagged: value,
              searches: searches.map(e => ({
                ...e,
                created: copyDate(e.created).toString()
              })),
              templates: templates.map(e => ({
                ...e,
                created: copyDate(e.created).toString()
              }))
            }, () => {
                if (this.state.onToFlag) {
                  return this.removeVideosToFlag(true)
                } else {
                  return document.getElementById('formFlagging').submit();
                }
            });
          } else if (name === 'videosToFlag') {
            chrome.storage.local.set({
              videosToFlag: this.state.videosToFlag
            })
            chrome.runtime.sendMessage({ type: 'updateBadgeText', videosToFlag: this.state.videosToFlag });
          }
        }

        render() {
          return (
            <YouTubeContext.Provider value={{
              state: this.state,
              selectVideos: (videos = []) => this.selectItems(videos, 'videosDisplayed'),
              selectSearches: (searches = []) => this.selectItems(searches, 'searches'),
              selectAll: (type, force = true) => this.selectItems(this.state[type], type, force),
              filterVideos: type => this.filterVideos(type),
              addTemplate: (template = [], callback) => this.actionItem(template, 'templates', callback),
              removeTemplate: (template = [], callback) => this.actionItem(template, 'templates', callback),
              openModal: (type, isOpen = true) => this.openModal(type, isOpen),
              removeVideosToFlag: sendForme => this.removeVideosToFlag(sendForme),
              addSearch: (search = [], callback) => this.actionItem(search, 'searches', callback),
              removeSearch: (search = [], callback) => this.actionItem(search, 'searches', callback),
              setState: (name, value, stuffs = null) => this.setState({
                [name]: value
              }, () => this.callbackState(name, value, stuffs)),
            }}>{this.props.children}
            </YouTubeContext.Provider>
          )
        }
      }

      ReactDOM.render(<YouTubeProvider><App /></YouTubeProvider>, myReactApp);
    })
    .catch(e => console.warn('Error TF-Center: ' + e))
}

let pathname = getPathname()

if (getUrlParameter('v') || urlsAvailable.includes(pathname)) {
  initExtension();
} else {
  document.body.style.overflow = 'auto'
}

// if async page changes
let oldHref = document.location.href;
window.onload = function () {
  let bodyList = document.querySelector("body")
  let observer = new MutationObserver(mutations => {
      mutations.forEach(async () => {
        if (oldHref != document.location.href) {
          oldHref = document.location.href;
          let elem = document.getElementById('button-flag-TF');
          let newId = getUrlParameter('v');
          elem && elem.parentNode.removeChild(elem);
          await wait(0)

          // Check if page is a watched page
          if (!newId) return;

          // While can no exceded 3s (security process)
          let stopAtInMilliseconds = 3000;
          let seconds = 0;
          while (!document.querySelector(`[video-id="${newId}"]`)) {
            await wait(50)
            seconds+= 50
            if (seconds >= stopAtInMilliseconds) return;
          }

          return initExtension()
        }
      });
    });

  let config = {
    childList: true,
    subtree: true
  };

  observer.observe(bodyList, config);
};