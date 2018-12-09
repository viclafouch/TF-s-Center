import React, { Component } from 'react'
import VideoListItem from './VideoListItem';
import Popup from '../Popup/Popup'
import Video from '@shared/models/Video.class'
import VideoDetail from '../VideoDetail/VideoDetail';
import Loader from '../layouts/Loader';
import { YouTubeContext } from '@stores/YouTubeContext';
import { fetchYouTubeChannel, fetchYouTubeVideo } from '@shared/api/YouTube';
import { redirectToWebCache, setStateAsync, wrapURLs, randomId } from '@utils/index';

export class VideosList extends Component {

  constructor() {
    super()

    this.state = {
      videoSelected: new Video(),
      isLoading: false
    }

    this.descriptionDetail = React.createRef();
    this.handleChange = this.handleChange.bind(this)
    this.closePopup = this.closePopup.bind(this)
    this.checkedVideo = this.checkedVideo.bind(this)
  }

  /**
   * get all details about a video (video, channel)
   * @param {Video} video - Video selected
   */
  async getInfoVideo(video) {
    if (!video.id) return
    if (video.isRemoved) return redirectToWebCache(`https://www.youtube.com/watch?v=${video.id}`, true)

    try {
      await setStateAsync({ isLoading: true }, this)
      const { selected } = video
      const videoSelected = await fetchYouTubeVideo(video.id)
      videoSelected.selected = selected
      videoSelected.channel = await fetchYouTubeChannel(videoSelected.channelId)

      let description = wrapURLs(videoSelected.description, true);
      description = description.replace(/(?:\r\n|\r|\n)/g, '<br>');
      this.descriptionDetail.current.innerHTML = description
      return this.setState({ videoSelected })
    } catch (error) {
      this.props.context.setState({
        notification: { id: randomId(), type: 'getVideo', params: { level: 'error', message: error.message } },
      })
      // TODO
      // if (error.message === "NOT_FOUND_OR_REMOVED" && this.props.context.state.onToFlag) {
      //   const { videosToFlag } = this.props.context.state;
      //   const existingIndex = videosToFlag.findIndex(x => x.id === video.id)
      //   if (existingIndex !== -1) {
      //     videosToFlag.splice(existingIndex, 1);
      //   }
      //   this.props.context.setState('videosToFlag', videosToFlag)
      // }
    } finally {
      return this.setState({ isLoading: false })
    }
  }

  /**
   *
   * @param {Event} event - Event of user action
   * @param {Video} video - Video checked/unchecked
   */
  checkedVideo(event, video) {
    event.preventDefault()
    this.props.context.selectVideos([video])
    this.closePopup()
  }

  /**
   * on Popup close
   * Reset empty video
   */
  closePopup() {
    return this.setState({ videoSelected: new Video() })
  }

  /**
   * When user right clic on a video
   * @param {Event} e - On checkbox change
   */
  handleChange(e) {
    e.stopPropagation()
    const id = e.target.id
    const video = this.props.videos.find(x => x.id === id)
    if (video && this.props.canFlag) return this.props.onSelect(video, e.target.checked)
    return
  }

  render() {

    const { videos } = this.props;

    return (
      <div className="container-list scrollBarOnHover main-body">
        {this.state.isLoading && <Loader />}
        <YouTubeContext.Consumer>
          {(context) => (
            <ul className={"videos-list pdi--top-0 " + (context.state.displaying === 'column' ? 'byColumns' : 'byRows')}>
              {videos.map((elem, index) => {
                return (
                  <li key={index}>
                    { this.props.canFlag &&
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
                          top: (context.state.displaying === 'column' ? 2 : 3),
                          left: (context.state.displaying === 'column' ? 2 : 3)
                        }}
                      />
                    }
                    <VideoListItem
                      video={elem}
                      onSelect={() => this.getInfoVideo(elem)}
                      onCheck={e => this.props.canFlag && this.checkedVideo(e, elem)}
                    />
                </li>
              )})}
            </ul>
          )}
        </YouTubeContext.Consumer>
        <Popup
          isOpen={this.state.videoSelected.id && !this.state.isLoading}
          onClosed={this.closePopup}
          maxWidth={1100}
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

export default VideosList
