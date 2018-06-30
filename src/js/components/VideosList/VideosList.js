import React, { Component } from 'react'
import VideoListItem from './VideoListItem';

export class VideosList extends Component {
    render() {
        return (
            <ul className="videos-list">
                { this.props.videos.map((elem, index) => {
                    return (
                        <li key={index}>
                            <VideoListItem video={elem} />
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default VideosList
