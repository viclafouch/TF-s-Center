import React, { Component } from 'react'
import ToolsFlag from '@components/ToolsFlag/ToolsFlag'
import { VideosList } from '@components/VideosList/VideosList';
import Popup from '@components/Popup/Popup';
import FormReporting from '@components/FormReporting/FormReporting'
import { YouTubeContext } from '@stores/YouTubeContext';
import { getUrlParameter } from '@utils';
import { copyObject } from '@utils/index';

export class FormFlagging extends Component {

  constructor() {
    super();
    this.state = {
      flag_comments: '',
      reason: '',
      templateIdSelected: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let specialSearch = getUrlParameter('searchId');
    if (!!specialSearch && this.props.canFlag) {
      const search = this.props.context.state.searches.find(x => x.id == specialSearch)
      if (!search) return; // Didin't find search saved

      /**
       * Auto Select videos
       */
      if (search.autoSelect) {
          const searchText = search.value.cleanString();
          const videosDetected = this.props.context.state.videosDisplayed.filter(elem => elem.title.cleanString().search(searchText) !== -1 || elem.description.cleanString().search(searchText) !== -1)
          this.props.context.selectVideos(videosDetected);
      }

      /**
       * Autocomplete form flagging
       */
      const template = this.props.context.state.templates.find(x => x.id == search.templateId)
      if (!template) return; // Didin't find template saved

      return this.setState({
          flag_comments: template.description,
          reason: template.type,
          templateIdSelected: template.id
      });
    }
  }

  /**
   * On check/uncheck a video, edit videosDisplayed
   * @param {Video} video
   * @param {boolean} checked
   * @param {Object} context
   */
  handleSelectVideo(video, checked, context) {
    const { videosDisplayed } = context.state;
    let videoIndex = videosDisplayed.findIndex(elem => elem.id === video.id);
    videosDisplayed[videoIndex].selected = checked;
    return context.setState('videosDisplayed', videosDisplayed);
  }

  /**
   * On select template in form flagging
   * @param {Event} e
   * @param {Object} context
   */
  handleChange(e, context = {}) {
    const value = e.target.value
    const name = e.target.name
    const previousState = copyObject(this.state)

    if (name === 'templateIdSelected' && value !== '') {
        const template = context.state.templates.find(x => x.id == value)
        previousState.flag_comments = template.description
        previousState.reason = template.type
    }
    previousState[name] = value
    return this.setState(previousState)
  }

  render() {
    const nbPage = getUrlParameter('page') || '1' // Int @string
    const filterPeriod = getUrlParameter('filters') || '' // @string select
    const search = this.props.context.state.search || '' // @string

    return (
      <YouTubeContext.Consumer>
        {(context) => (
          <form action="/deputy?action_submit" id="formFlagging" method="POST" className="form-flagging full-heigth">
            <input type="hidden" name="search_query" value={search} />
            <input type="hidden" name="page" value={nbPage} />
            <input type="hidden" name="filters" value={filterPeriod} />
            <ToolsFlag canFlag />
            <VideosList
              videos={context.state.videosDisplayed}
              context={context}
              canFlag
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
