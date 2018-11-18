import React, { Component } from 'react'
import { YouTubeContext } from '../../main';

export class VideoListItem extends Component {

    constructor() {
        super();

        this.state = {
            iframeActive: false,
            active: false
        }
    }

    loadDescription() {
        let pDescription = document.createElement('p');
        pDescription.innerHTML = this.props.video.description;
        document.getElementById('description-'+this.props.video.id).innerHTML = '';
        document.getElementById('description-'+this.props.video.id).appendChild(pDescription);
    }

    render() {

        let { video } = this.props;

        return (
                <article className={"video-item " + (!video.isRemoved ? 'isAccess' : '')}>
                    <YouTubeContext.Consumer>
                        {(context) => (
                            context.state.displaying === 'column' ?
                                <React.Fragment>
                                    <div className="video-item-thumbnail" onClick={this.props.onSelect} onContextMenu={this.props.onCheck}>
                                        <img className="thumbnail" src={video.isRemoved ? video.thumbnails.default.url : video.thumbnails.high.url} />
                                    </div>
                                    <div className="video-item-text">
                                        <h3 className="mgi--bottom-8 mgi--top-8 video-item-title">
                                            <a href={video.getVideoUrl()} target="_blank" title={!video.isRemoved ? video.title : ''} className={video.isRemoved ? 'removed-on-text' : video.isReviewed ? 'reviewed-on-text' : ''}>{video.title || 'This video is no longer available'}</a>
                                        </h3>
                                        {
                                            !video.isRemoved &&
                                            <a className="video-item-creator" href={video.channelUrl}>{video.channelTitle}</a>
                                        }
                                    </div>
                                </React.Fragment>
                                :
                                <div className="flex-me flex-align" onLoad={() => this.loadDescription()} onContextMenu={this.props.onCheck}>
                                    <div className="video-item-thumbnail" onClick={this.props.onSelect}>
                                        <img className="thumbnail" src={video.thumbnails.default.url} />
                                    </div>
                                    <div className="mgi--left-15 video-item-text" style={{flex: '1'}}>
                                        <h3 className="mgi--bottom-8 video-item-title">
                                            <a href={video.getVideoUrl()} target="_blank" title={!video.isRemoved ? video.title : ''} className={video.isRemoved ? 'removed-on-text' : video.isReviewed ? 'reviewed-on-text' : ''}>{video.title || 'This video is no longer available'}</a>
                                        </h3>
                                        <p className="video-item-description mgi--bottom-4" id={'description-'+video.id}></p>
                                        {
                                            !video.isRemoved &&
                                            <p className="video-notes">
                                                <a className="video-item-creator" href={video.channelUrl}>{video.channelTitle}</a>
                                                {' | '}
                                                <span>{video.videoAddedTime}</span>
                                                {' | '}
                                                <span>{video.viewCount}</span>
                                            </p>
                                        }
                                    </div>
                                </div>
                        )}
                    </YouTubeContext.Consumer>
                </article>

        )
    }
}

export default VideoListItem