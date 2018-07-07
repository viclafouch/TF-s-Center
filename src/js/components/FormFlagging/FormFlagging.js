import React, { Component } from 'react'
import Button from '../Button';
import ToolsFlag from '../ToolsFlag/ToolsFlag'
import { VideosList } from '../VideosList/VideosList';
import Popup from '../Popup/Popup';
import FormReporting from '../FormReporting/FormReporting'
import { YouTubeContext } from '../../main';

export class FormFlagging extends Component {

    constructor(props) {
        super(props);

        this.state = {
            flag_comments: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleSelectVideo(video, checked, context) {
        const { videosDisplayed } = context.state;

        let videoIndex = videosDisplayed.findIndex(elem => elem.id === video.id);

        videosDisplayed[videoIndex].selected = checked;

        return context.setState('videosDisplayed', videosDisplayed);
    }

    handleChange(e) {
        let value = e.target.value;
        let name = e.target.name;

        return this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <YouTubeContext.Consumer>
                {(context) => (
                    <form action="/deputy?action_submit" id="formFlagging" method="POST" className="form-flagging full-heigth" onSubmit={() => context.setState('popupReportingOpened', true)}>
                        <input type="hidden" name="search_query" value={context.state.search} />
                        <ToolsFlag />
                        <VideosList
                            videos={context.state.videosDisplayed}
                            onSelect={(video, checked) => this.handleSelectVideo(video, checked, context)}
                        />
                        <Popup
                            isOpen={context.state.popupReportingOpened}
                            onClosed={() => context.setState('popupReportingOpened', false)}
                        >
                            <FormReporting
                                description={this.state.flag_comments}
                                handleChange={this.handleChange}
                                onClosed={() => context.setState('popupReportingOpened', false)}
                            />
                        </Popup>
                    </form>
                )}
            </YouTubeContext.Consumer>
        )
    }
}

export default FormFlagging
