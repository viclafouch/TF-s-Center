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
            flag_comments: '',
            reason: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleSelectVideo(video, checked, context) {
        const { videosDisplayed } = context.state;

        let videoIndex = videosDisplayed.findIndex(elem => elem.id === video.id);

        videosDisplayed[videoIndex].selected = checked;

        return context.setState('videosDisplayed', videosDisplayed);
    }

    getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'), sParameterName, i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    handleChange(e, context = {}) {
        let value = e.target.value;
        let name = e.target.name;

        let previousState = this.state;

        if (name === 'templateIdSelected' && value !== '') {
            let template = context.state.templates.find(x => x.id == value)
            previousState.flag_comments = template.description
            previousState.reason = template.type
        }

        previousState[name] = value;

        return this.setState(previousState);
    }

    render() {
        return (
            <YouTubeContext.Consumer>
                {(context) => (
                    <form action="/deputy?action_submit" id="formFlagging" method="POST" className="form-flagging full-heigth" onSubmit={() => context.setState('popupReportingOpened', true)}>
                        <input type="hidden" name="search_query" value={context.state.search} />
                        <input type="hidden" name="page" value={this.getUrlParameter('page') || 1} />
                        <input type="hidden" name="filters" value={this.getUrlParameter('filters') || ''} />
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
                                reason={this.state.reason}
                                templateIdSelected={this.state.templateIdSelected}
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
