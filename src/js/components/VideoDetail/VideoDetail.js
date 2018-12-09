import React, { Component } from 'react'
import Button from '../Button'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { getDateAwesome } from '@utils/date';

export class VideoDetail extends Component {

  constructor() {
    super();

    this.state = {
      copied: false
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (!props.video.id && state.copied) return { copied: false }
    return null;
  }

  render() {

    const { video } = this.props;

    return (
      <div className="video-popup">
        <div className="video-popup-body">
          <div className="video-popup-body-main">
            <div style={{
              width: '100%',
              position: 'relative',
              height: 0,
              overflow: 'hidden',
              background: !!(video.id) ? `#000 url('${video.thumbnails.maxres ? video.thumbnails.maxres.url : video.thumbnails.high.url}')` : '#000',
              backgroundAttachment: 'scroll',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              paddingBottom: '56.25%'
            }}>
              {
              <iframe
                id="ytplayer"
                type="text/html"
                src={video.id ? video.getVideoEmbed() : ''}
                className="youtube-iframe"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              }
            </div>
          </div>
        <div className="video-popup-body-aside">
          <section className="thumbs-section">
            {video.id && <img src={video.thumbnails.medium.url} />}
          </section>
          <section className="tags-section">
            <ul className="list-tags scrollBarOnHover">
              {
                video.tags.map((elem, index) =>
                  <li className="tag" title={elem} key={index}>{elem}</li>
                )
              }
            </ul>
          </section>
          <section className="action-section">
            <div className="action-btn">
              <div className="copied-action">
                <CopyToClipboard text={`https://www.youtube.com/watch?v=${video.id}`}
                  onCopy={() => this.setState({ copied: true })}>
                  <Button blue className="mgi--top-0 mgi--right-6">Copy video Url</Button>
                </CopyToClipboard>
                {this.state.copied && <span>Copied</span>}
              </div>
            </div>
            {
            this.props.canFlag &&
              <div className="action-btn">
                <Button blue onClick={e => this.props.onCheck(e, video)}>{video.selected ? 'Remove from the list' : 'Add to list'}</Button>
              </div>
            }
          </section>
        </div>
      </div>
      <div className="video-popup-footer mgi--top-10">
        <div className="title">
          <h3>{video.title}</h3>
        </div>
        <div className="channel-user mgi--bottom-15">
          <a href={`/channel/${video.channelId}`} target="_blank">
            <img src={video.channel ? video.channel.thumbnails.default.url : ''} alt="" className="channel-logo" />
          </a>
          <div>
            <p className="channel-name">
              <a href={`/channel/${video.channelId}`} target="_blank">{video.channelTitle}</a>
            </p>
            <p className="video-published">Published on {getDateAwesome(video.publishedAt)}</p>
          </div>
        </div>
        <div className="description scrollBarOnHover">
          <div ref={this.props.innerRef} id="description-content"></div>
        </div>
      </div>
    </div>
    )
  }
}

export default React.forwardRef((props, ref) => <VideoDetail innerRef={ref} {...props} /> )