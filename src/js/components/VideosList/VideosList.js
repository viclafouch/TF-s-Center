import React, { Component } from 'react'
import VideoListItem from './VideoListItem';
import Popup from '../Popup/Popup'
import Video from '../../shared/models/Video.class'
import VideoDetail from '../VideoDetail/VideoDetail';

export class VideosList extends Component {

    constructor() {
        super();

        this.state = {
            videoSelected: new Video()
        }

        this.handleChange = this.handleChange.bind(this);
    }

    async getVideo(id) {
        if (!id) return;

        console.log(id);


        await new Promise(resolve => setTimeout(resolve, 300))

        let video = new Video({id: id})

        this.setState({
            videoSelected: video
        });
    }

    handleChange(e) {
        e.stopPropagation();
        let id = e.target.id;
        let video = this.props.videos.find(x => x.id === id);
        this.props.onSelect && this.props.onSelect(video, e.target.checked);
    }

    render() {

        let { videos, canFlag } = this.props;

        console.log(this.state);


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
                <Popup
                    isOpen={!!(this.state.videoSelected.id)}
                    onClosed={() => this.setState({ videoSelected: new Video() })}
                >
                    <VideoDetail
                        video={this.state.videoSelected}
                    />
                </Popup>
            </div>
        )
    }
}

export default VideosList
