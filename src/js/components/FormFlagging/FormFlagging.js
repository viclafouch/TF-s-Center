import React, { Component } from 'react'
import ToolsFlag from '../ToolsFlag/ToolsFlag'
import { VideosList } from '../VideosList/VideosList';
import Popup from '../Popup/Popup';
import FormReporting from '../FormReporting/FormReporting'
import { YouTubeContext } from '../../store/YouTubeContext';
import { getUrlParameter } from '../../utils/utils';

export class FormFlagging extends Component {

    constructor(props) {
        super(props);

        this.state = {
            flag_comments: '',
            reason: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let specialSearch = getUrlParameter('searchId');
        if (this.props.context) {
            if (this.props.context.state.canFlag && !!specialSearch) {
                let search = this.props.context.state.searches.find(x => x.id == specialSearch)
                if (!search) return;

                if (search.autoSelect) {
                    let searchText = search.value.cleanString();
                    let videosDetected = this.props.context.state.videosDisplayed.filter(elem => elem.title.cleanString().search(searchText) !== -1 || elem.description.cleanString().search(searchText) !== -1)
                    this.props.context.selectVideos(videosDetected);
                }

                let template = this.props.context.state.templates.find(x => x.id == search.templateId)

                if (!template) return;

                return this.setState({
                    flag_comments: template.description,
                    reason: template.type,
                    templateIdSelected: template.id
                });
            }
        }
    }


    handleSelectVideo(video, checked, context) {
        const { videosDisplayed } = context.state;

        let videoIndex = videosDisplayed.findIndex(elem => elem.id === video.id);

        videosDisplayed[videoIndex].selected = checked;

        return context.setState('videosDisplayed', videosDisplayed);
    }

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

      const nbPage = getUrlParameter('page') || '1' // Int @string
      const filterPeriod = getUrlParameter('filters') || '' // anytime !== '' wtfff @string select
      const search = this.props.context.state.search || '' // @string

        return (
            <YouTubeContext.Consumer>
                {(context) => (
                    <form action="/deputy?action_submit" id="formFlagging" method="POST" className="form-flagging full-heigth">
                        <input type="hidden" name="search_query" value={search} />
                        <input type="hidden" name="page" value={nbPage} />
                        <input type="hidden" name="filters" value={filterPeriod} />
                        <ToolsFlag />
                        <VideosList
                            videos={context.state.videosDisplayed}
                            context={context}
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
