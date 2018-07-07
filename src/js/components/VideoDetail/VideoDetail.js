import React, { Component } from 'react'
import Button from '../Button'

export class VideoDetail extends Component {

    constructor() {
        super();

        this.loadListener = this.loadListener.bind(this);
    }

    loadListener() {
        this.props.onLoad();
        let { description } = this.props.video

        description = this.wrapURLs(description, true);
        description = description.replace(/(?:\r\n|\r|\n)/g, '<br>');

        let pDescription = document.createElement('p');
        pDescription.innerHTML = description;
        document.getElementById('description-content').innerHTML = '';
        document.getElementById('description-content').appendChild(pDescription);
    }

    wrapURLs(text = '', new_window) {
        var url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;
        var target = (new_window === true || new_window == null) ? '_blank' : '';

        return text.replace(url_pattern, function (url) {
            var protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
            var href = protocol_pattern.test(url) ? url : 'http://' + url;
            return '<a href="' + href + '" target="' + target + '">' + url + '</a>';
        });
    };

    render() {
        let { video } = this.props;


        console.log({video});


        let youTubeUrl = "https://www.youtube.com/embed/"
        let videoParams = "?autoplay=1&rel=0&showinfo=0"
        return (
            <div className="video-popup">
                <div className="video-popup-body">
                    <div className="video-popup-body-main">
                        <div style={{
                            width: '100%',
                            position: 'relative',
                            height: 0,
                            overflow: 'hidden',
                            backgroundColor: 'black',
                            paddingBottom: '56.25%'
                        }}>
                            {
                                video.id &&
                                <iframe
                                    src={youTubeUrl + video.id + videoParams}
                                    onLoad={this.loadListener}
                                    frameBorder={0}
                                    className="youtube-iframe"
                                    frameBorder="0"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                />
                            }
                        </div>
                    </div>
                    <div className="video-popup-body-aside">
                        <section className="thumbs-section" style={{ height: 180, width: 320 }}>
                            {video.thumbnails && <img src={video.thumbnails.medium.url} />}
                        </section>
                        <section className="tags-section">
                            <ul className="list-tags">
                                {
                                    video.tags.slice(0, 10).map((elem, index) =>
                                        <li className="tag" key={index}>{elem}</li>
                                    )
                                }
                            </ul>
                        </section>
                        <section className="action-section">
                            <Button blue>Copy video Url</Button>
                            <Button blue onClick={e => this.props.onCheck(e, video)}>Add to list</Button>
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
                            <p className="video-published">Published on Feb 17, 2015</p>
                        </div>
                    </div>
                    <div className="description scrollBarOnHover">
                        <div id="description-content"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VideoDetail
