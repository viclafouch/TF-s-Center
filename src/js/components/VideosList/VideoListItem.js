import React, { Component } from 'react'
import { YouTubeContext } from '@stores/YouTubeContext'

export class VideoListItem extends Component {
  render() {
    const { video } = this.props
    return (
      <article className={`video-item ${!video.isRemoved ? 'isAccess' : ''}`}>
        <YouTubeContext.Consumer>
          {context =>
            context.state.displaying === 'column' ? (
              <>
                <div className="video-item-thumbnail" onClick={this.props.onSelect} onContextMenu={this.props.onCheck}>
                  <img className="thumbnail" src={video.isRemoved ? video.thumbnails.default.url : video.thumbnails.high.url} />
                </div>
                <div className="video-item-text">
                  <h3 className="mgi--bottom-8 mgi--top-8 video-item-title">
                    <a
                      href={video.getVideoUrl()}
                      target="_blank"
                      rel="noreferrer"
                      title={!video.isRemoved ? video.title : ''}
                      className={video.isRemoved ? 'removed-on-text' : video.isReviewed ? 'reviewed-on-text' : ''}
                    >
                      {video.title || 'This video is no longer available'}
                    </a>
                  </h3>
                  {!video.isRemoved && (
                    <a className="video-item-creator" href={video.channelUrl}>
                      {video.channelTitle}
                    </a>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-me" onContextMenu={this.props.onCheck}>
                <div className="video-item-thumbnail" onClick={this.props.onSelect}>
                  <img className="thumbnail" src={video.thumbnails.default.url} />
                </div>
                <div className="mgi--left-15 video-item-text flex-one">
                  <h3 className="mgi--bottom-8 video-item-title">
                    <a
                      href={video.getVideoUrl()}
                      target="_blank"
                      rel="noreferrer"
                      title={!video.isRemoved ? video.title : ''}
                      className={
                        video.isRemoved
                          ? 'removed-on-text'
                          : video.isReviewed
                          ? 'reviewed-on-text'
                          : video.isAgeRestricted
                          ? 'age-restricted-on-text'
                          : ''
                      }
                    >
                      {video.title || 'This video is no longer available'}
                    </a>
                  </h3>
                  <p
                    className="video-item-description mgi--bottom-4"
                    dangerouslySetInnerHTML={{
                      __html: `<p>${this.props.video.description}</p>`
                    }}
                  />
                  {!video.isRemoved && video.channelTitle && (
                    <p className="video-notes">
                      <a className="video-item-creator" href={video.channelUrl}>
                        {video.channelTitle}
                      </a>
                      |<span>{video.videoAddedTime}</span>|<span>{video.viewCount}</span>
                    </p>
                  )}
                </div>
              </div>
            )
          }
        </YouTubeContext.Consumer>
      </article>
    )
  }
}

export default VideoListItem
