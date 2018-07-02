import React, { Component } from 'react'
import Button from '../Button';
import ToolsFlag from '../ToolsFlag/ToolsFlag'
import { VideosList } from '../VideosList/VideosList';

export class FormFlagging extends Component {

    constructor(props) {
        super(props);

        this.state = {
            videosSelected: [],
            videos: props.videos || []
        }
    }

    handleSelectVideo(video) {
        let { videos } = this.state;

        let videoIndex = videos.findIndex(elem => elem.id === video.id);

        videos[videoIndex].selected = true;

        this.setState({
            videos: videos
        });

    }

    render() {
        return (
            <form action="POST" method="/deputy?action_submit">
                <ToolsFlag />
                <VideosList
                    videos={this.state.videos}
                    canFlag
                    onSelect={(video) => this.handleSelectVideo(video)}
                />
            </form>
        )
    }
}

export default FormFlagging
