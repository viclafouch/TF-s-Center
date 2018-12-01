import React, { Component } from 'react'
import VideoListItem from './VideoListItem';
import Popup from '../Popup/Popup'
import Video from '../../shared/models/Video.class'
import VideoDetail from '../VideoDetail/VideoDetail';
import Loader from '../layouts/Loader';
import { YouTubeContext } from '../../store/YouTubeContext';
import { YOUTUBE_API_KEYS } from '../../../../private';

export class VideosList extends Component {

    constructor() {
        super();

        this.state = {
            videoSelected: new Video(),
            isLoading: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.checkedVideo = this.checkedVideo.bind(this);
    }

    getChannel(id) {
        let whyDoUSearchMyKey = YOUTUBE_API_KEYS
        return fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${id}&key=${whyDoUSearchMyKey}`)
            .then(response => response.json())
            .then(response => response.items[0].snippet)
            .catch(e => {
                throw e
            })
    }

    getVideo(id) {
        let whyDoUSearchMyKey = YOUTUBE_API_KEYS
        return fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${whyDoUSearchMyKey}`)
            .then(response => response.json())
            .then(response => {
                if (!response.items) throw new Error('UNKNOWN')
                if (response.items.length === 0) throw new Error('NOT_FOUND_OR_REMOVED')
                return response.items[0].snippet
            })
            .then(responseVideo => {
                responseVideo.id = id
                return new Video(responseVideo)
            })
            .catch(e => {
                throw e
            })
    }

    redirectToWebCache(video) {
        return window.open(`http://webcache.googleusercontent.com/search?q=cache:https://www.youtube.com/watch?v=${video.id}`, '_blank');
    }

    getInfoVideo(video) {
        if (!video.id) return;

        if (video.isRemoved) return this.redirectToWebCache(video);

        return this.setState({
            isLoading: true
        }, async () => {
            try {
                const selected = video.selected;
                video = await this.getVideo(video.id);
                video.selected = selected;
                let channel = await this.getChannel(video.channelId);

                video.channel = channel;

                return this.setState({
                    videoSelected: video,
                    isLoading: false
                });
            } catch (error) {
                if (error.message === "NOT_FOUND_OR_REMOVED" && this.props.context.state.onToFlag) {
                  const { videosToFlag } = this.props.context.state;
                  const existingIndex = videosToFlag.findIndex(x => x.id === video.id)
                  if (existingIndex !== -1) {
                    videosToFlag.splice(existingIndex, 1);
                  }
                  this.props.context.setState('videosToFlag', videosToFlag)
                }
                console.error(error);
                this.setState({
                    isLoading: false
                });
            }
        })
    }

    checkedVideo(event, video) {
        event.preventDefault();
        this.props.context.selectVideos([video]);
        this.closePopup();
    }

    closePopup() {
        document.getElementById('description-content').innerHTML = '';
        return this.setState({
            videoSelected: new Video(),
            videoLoaded: false
        });
    }

    handleChange(e) {
        e.stopPropagation();
        let id = e.target.id;
        let video = this.props.videos.find(x => x.id === id);
        this.props.onSelect && this.props.onSelect(video, e.target.checked);
    }

    render() {

        let { videos } = this.props;

        return (
            <div className="container-list scrollBarOnHover main-body">
                <YouTubeContext.Consumer>
                    {(context) => (
                        <ul className={"videos-list pdi--top-0 " + (context.state.displaying === 'column' ? 'byColumns' : 'byRows')}>
                            {videos.map((elem, index) => {
                                return (
                                    <li key={index}>
                                        {
                                            context.state.canFlag &&
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
                                            onCheck={e => context.state.canFlag && this.checkedVideo(e, elem)}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </YouTubeContext.Consumer>
                { this.state.isLoading && <Loader /> }

                <Popup
                    isOpen={this.state.videoSelected.id && !this.state.isLoading}
                    onClosed={this.closePopup}
                    maxWidth={1100}
                >
                    <VideoDetail
                        video={this.state.videoSelected}
                        onCheck={(e, video) => this.checkedVideo(e, video)}
                    />
                </Popup>
            </div>
        )
    }
}

export default VideosList
