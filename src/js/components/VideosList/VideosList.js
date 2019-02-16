import React, { Component } from 'react'
import VideoListItem from './VideoListItem'
import { withRouter } from 'react-router'
import Popup from '../Popup/Popup'
import Video from '@shared/models/Video.class'
import VideoDetail from '../VideoDetail/VideoDetail'
import Loader from '../layouts/Loader'
import { YouTubeContext } from '@stores/YouTubeContext'
import { fetchYouTubeChannel, fetchYouTubeVideo } from '@shared/api/YouTube'
import {
  redirectToWebCache,
  setStateAsync,
  wrapURLs,
  randomId
} from '@utils/index'

export class VideosList extends Component {
  constructor() {
    super()

    this.state = {
      videoSelected: new Video(),
      isLoading: false
    }

    this.containerScroller = React.createRef()
    this.videoDetail = React.createRef()
    this.descriptionDetail = React.createRef()
    this.handleChange = this.handleChange.bind(this)
    this.checkedVideo = this.checkedVideo.bind(this)
  }

  /**
   * get all details about a video (video, channel)
   * @param {Video} video - Video selected
   */
  async getInfoVideo(video) {
    if (!video.id) return
    if (video.isRemoved)
      return redirectToWebCache(
        `https://www.youtube.com/watch?v=${video.id}`,
        true
      )

    try {
      await setStateAsync({ isLoading: true }, this)
      const { selected } = video
      const videoSelected = await fetchYouTubeVideo(video.id)
      videoSelected.selected = selected
      videoSelected.channel = await fetchYouTubeChannel(videoSelected.channelId)
      let description = wrapURLs(videoSelected.description, true)
      description = description.replace(/(?:\r\n|\r|\n)/g, '<br>')
      this.descriptionDetail.current.innerHTML = description
      await setStateAsync({ videoSelected }, this)
      await this.props.context.openModal('video-detail')
    } catch (error) {
      this.props.context.setState({
        notification: {
          id: randomId(),
          type: 'getVideo',
          params: { level: 'error', message: error.message }
        }
      })

      if (error.id === 'ERROR_GET_VIDEO_DELETED') {
        const { videosToFlag } = this.props.context.state
        const videoTargetIndex = videosToFlag.findIndex(x => x.id === video.id)
        if (videoTargetIndex !== -1) {
          videosToFlag.splice(videoTargetIndex, 1)
          this.props.context.setState({
            videosToFlag,
            videosDisplayed: this.props.context.state.onToFlag
              ? videosToFlag
              : this.props.context.state.videosDisplayed
          })
        }
      }
    } finally {
      return this.setState({ isLoading: false })
    }
  }

  /**
   * Reset scroll on new location
   * @param {Object} prevProps
   */
  componentDidUpdate(prevProps) {
    if (prevProps.location.key !== this.props.location.key)
      this.containerScroller.current.scrollTop = 0
  }

  /**
   *
   * @param {Event} event - Event of user action
   * @param {Video} video - Video checked/unchecked
   */
  checkedVideo(event, video) {
    event.preventDefault()
    this.props.context.selectVideos([video])
    this.videoDetail.current.closeModal(this.props.context)
  }

  /**
   * When user right clic on a video
   * @param {Event} e - On checkbox change
   */
  handleChange(e) {
    e.stopPropagation()
    const id = e.target.id
    const video = this.props.videos.find(x => x.id === id)
    if (video && this.props.canFlag)
      return this.props.onSelect(video, e.target.checked)
    return
  }

  render() {
    const { videos } = this.props
    return (
      <div
        className="container-list scrollBarOnHover main-body"
        ref={this.containerScroller}
      >
        {this.state.isLoading && <Loader />}
        <YouTubeContext.Consumer>
          {context => (
            <ul
              className={
                'videos-list pdi--top-0 ' +
                (context.state.displaying === 'column' ? 'byColumns' : 'byRows')
              }
            >
              {videos.map((elem, index) => {
                return (
                  <li key={index}>
                    {this.props.canFlag && (
                      <input
                        type="checkbox"
                        id={elem.id}
                        className="yt-uix-form-input-checkbox deputy-flag-video-checkbox"
                        value={elem.id}
                        name="selected_vid"
                        checked={elem.selected}
                        onChange={this.handleChange}
                        style={{
                          position: 'absolute',
                          top: context.state.displaying === 'column' ? 2 : 3,
                          left: context.state.displaying === 'column' ? 2 : 3
                        }}
                      />
                    )}
                    <VideoListItem
                      video={elem}
                      onSelect={() => this.getInfoVideo(elem)}
                      onCheck={e =>
                        this.props.canFlag && this.checkedVideo(e, elem)
                      }
                    />
                  </li>
                )
              })}
            </ul>
          )}
        </YouTubeContext.Consumer>
        <Popup
          ref={this.videoDetail}
          maxWidth={1100}
          type="video-detail"
          callbackOnClosed={() => this.setState({ videoSelected: new Video() })}
        >
          <VideoDetail
            ref={this.descriptionDetail}
            canFlag={this.props.canFlag}
            video={this.state.videoSelected}
            onCheck={(e, video) => this.checkedVideo(e, video)}
          />
        </Popup>
      </div>
    )
  }
}

export default withRouter(VideosList)
