import React, { Component } from 'react'

export class VideoDetail extends Component {

    constructor() {
        super();

        this.loadListener = this.loadListener.bind(this);
    }

    loadListener() {
        this.props.onLoad();
    }

    render() {
        let { video } = this.props;

        let youTubeUrl = "https://www.youtube.com/embed/"
        let videoParams = "?autoplay=1&rel=0&showinfo=0"
        return (
            <div className="video-popup">
                <div style={{
                    width: 560,
                    height: 315,
                    backgroundColor: 'black'
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
                <div className="video-popup-body">
                    <h3>{video.title}</h3>
                </div>
            </div>
        )
    }
}

export default VideoDetail
