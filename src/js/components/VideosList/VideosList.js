import React, { Component } from 'react'
import VideoListItem from './VideoListItem';

export class VideosList extends Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        e.stopPropagation();
        let id = e.target.id;
        let video = this.props.videos.find(x => x.id === id);
        this.props.onSelect && this.props.onSelect(video, e.target.checked);
    }

    render() {
        return (
            <ul className="videos-list pdi--top-0">
                { this.props.videos.map((elem, index) => {
                    return (
                        <li key={index}>
                            {
                                this.props.canFlag &&
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

                            <VideoListItem video={elem} />
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default VideosList
