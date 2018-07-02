import React, { Component } from 'react'
import Button from '../Button';
import ToolsFlag from '../ToolsFlag/ToolsFlag'
import { VideosList } from '../VideosList/VideosList';
import Popup from '../Popup/Popup';
import FormReporting from '../FormReporting/FormReporting'

export class FormFlagging extends Component {

    constructor(props) {
        super(props);

        this.state = {
            videosSelected: [],
            videos: props.videos || [],
            isAdd: true
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSelectVideo(video, checked) {
        let { videos } = this.state;

        let videoIndex = videos.findIndex(elem => elem.id === video.id);

        videos[videoIndex].selected = checked;

        return this.setState({
            videos: videos,
        });
    }

    handleSubmit(e) {

        if (e.target.id !== 'formFlagging') {
            e.preventDefault();
            if (this.state.videos.filter(elem => elem.selected).length > 0)
                return this.setState({
                    isAdd: true
                });
            return;
        }
    }

    render() {

        let { videos, isAdd } = this.state;

        return (
            <form action="/deputy?action_submit" id="formFlagging" method="POST" className="form-flagging" onSubmit={this.handleSubmit}>
                <input type="hidden" name="search_query" value={this.props.search} />
                <ToolsFlag
                    videos={videos}
                    onSubmit={this.handleSubmit}
                />
                <VideosList
                    videos={videos}
                    canFlag
                    onSelect={(video, checked) => this.handleSelectVideo(video, checked)}
                />
                <Popup
                    isOpen={isAdd}
                    onClosed={() => this.setState({isAdd:false})}
                >
                    <FormReporting
                        videos={videos}
                    />
                </Popup>
            </form>
        )
    }
}

export default FormFlagging
