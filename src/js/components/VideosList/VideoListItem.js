import React, { Component } from 'react'

export class VideoListItem extends Component {

    constructor() {
        super();

        this.state = {
            iframeActive: false,
            active: false
        }
    }

    render() {

        let { video } = this.props;

        return (
            <article className={"video-item " + (!video.isRemoved ? 'isAccess' : '')}>
                {/* <label className="video-item-thumbnail" htmlFor={video.id}>
                    <img className="thumbnail" src={video.thumbnail.replace('default', 'hqdefault')} />
                </label> */}
                <div className="video-item-thumbnail" onClick={this.props.onSelect}>
                    <img className="thumbnail" src={video.isRemoved ? video.thumbnails.default.url : video.thumbnails.high.url} />
                </div>
                <div className="video-item-text">
                    <h3 className="mgi--bottom-8 mgi--top-8 video-item-title">
                        <a href={video.getVideoUrl()} target="_blank" title={!video.isRemoved ? video.title : ''} className={video.isRemoved ? 'removed-on-text' : ''}>{video.title || 'This video is not longer available'}</a>
                    </h3>
                    {
                        !video.isRemoved &&
                        <a className="video-item-creator" href={video.channelUrl}>{video.channelTitle}</a>
                    }

                </div>
            </article>
        )
    }
}

export default VideoListItem