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
            <article>
                {video.id}
                <input
                    type="checkbox"
                    className="yt-uix-form-input-checkbox deputy-flag-video-checkbox"
                    value={video.id}
                />

                {
                    !this.state.iframeActive
                    ?
                        <div style={{
                            backgroundImage: `url(${video.thumbnail})`,
                            height: 200,
                            width: 200
                        }} onClick={
                            () => this.setState({
                                iframeActive: true
                            })
                        }></div>
                    :
                        <iframe width="420" height="315"
                            src={`https://www.youtube.com/embed/${video.id}`}>
                        </iframe>
                }
            </article>
        )
    }
}

export default VideoListItem