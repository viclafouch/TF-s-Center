import React, { Component } from 'react'
import VideoListItem from './VideoListItem';
import Popup from '../Popup/Popup'
import Video from '../../shared/models/Video.class'
import VideoDetail from '../VideoDetail/VideoDetail';
import Loader from '../layouts/Loader';

export class VideosList extends Component {

    constructor() {
        super();

        this.state = {
            videoSelected: new Video(),
            videoLoaded: false,
            isLoading: false
        }

        this.handleChange = this.handleChange.bind(this);
    }

    callYouTube(id) {
        let whyDoUSearchMyKey = 'AIzaSyBo4cXAPoLRFpiLi-l2Sj8OQpU3gQPUSko'
        return fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${whyDoUSearchMyKey}`)
            .then(response => response.json())
            .then(response => {
                if (!response.items) throw new Error('UNKNOWN')
                if (response.items.length === 0) throw new Error('NOT_FOUND_OR_REMOVED')
                return response.items[0].snippet
            })
            .then(video => {
                video =  new Video(video)
                video.id = id;
                return video;
            })
            .catch(e => {
                throw e
            })
    }

    getVideo(id) {
        if (!id) return;

        this.setState({
            isLoading: true
        }, async () => {
            await new Promise(resolve => setTimeout(resolve, 300))

            try {
                let video = await this.callYouTube(id);

                this.setState({
                    videoSelected: video
                });
            } catch (error) {
                console.error(error);
            }
        })
    }

    handleChange(e) {
        e.stopPropagation();
        let id = e.target.id;
        let video = this.props.videos.find(x => x.id === id);
        this.props.onSelect && this.props.onSelect(video, e.target.checked);
    }

    render() {

        let { videos, canFlag } = this.props;

        return (
            <div className="container-list scrollBarOnHover">
                <ul className="videos-list pdi--top-0">
                    {videos.map((elem, index) => {
                        return (
                            <li key={index}>
                                {
                                    canFlag &&
                                    <input
                                        type="checkbox"
                                        id={elem.id}
                                        style={{ position: 'absolute' }}
                                        className="yt-uix-form-input-checkbox deputy-flag-video-checkbox"
                                        value={elem.id}
                                        name="selected_vid"
                                        onChange={this.handleChange}
                                    />
                                }
                                <VideoListItem
                                    video={elem}
                                    onSelect={() => this.getVideo(elem.id)}
                                />
                            </li>
                        )
                    })}
                </ul>

                {
                    this.state.isLoading &&
                    <Loader />
                }

                <Popup
                    isOpen={this.state.videoLoaded && this.state.videoSelected.id && !this.state.isLoading}
                    onClosed={() => this.setState({ videoSelected: new Video(), videoLoaded: false })}
                >
                    <VideoDetail
                        video={this.state.videoSelected}
                        onLoad={() => this.setState({ videoLoaded: true, isLoading: false })}
                    />
                </Popup>
            </div>
        )
    }
}

export default VideosList
