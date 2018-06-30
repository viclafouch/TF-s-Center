import React, { Component } from 'react'

export class VideoListItem extends Component {

    constructor() {
        super();

        this.state = {
            iframeActive: false
        }
    }

    render() {

        let { video } = this.props;
        console.log(video);

        return (
            <article className="video-item">
                <img className="thumbnail" src={!video.isRemoved ? video.thumbnail.replace('default', 'hqdefault') : video.thumbnail} />
                <div className="video-item-text">
                    <h3 className="mgi--bottom-8 mgi--top-8">
                        <span className={video.isRemoved ? 'removed-on-text' : ''}>{video.title || 'This video is not longer available'}</span>
                    </h3>
                    <a className="video-item-creator" href={video.channelLink}>{video.creator}</a>
                </div>
            </article>
        )
    }
}

export default VideoListItem