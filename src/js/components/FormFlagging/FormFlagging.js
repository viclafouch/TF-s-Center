import React, { Component } from 'react'
import ToolsFlag from '@components/ToolsFlag/ToolsFlag'
import VideosList from '@components/VideosList/VideosList';
import Popup from '@components/Popup/Popup';
import FormReporting from '@components/FormReporting/FormReporting'
import { YouTubeContext } from '@stores/YouTubeContext';
import { getUrlParameter } from '@utils';
import { copyObject } from '@utils/index';

export class FormFlagging extends Component {

  constructor(props) {
    super(props);
    this.state = {
      flag_comments: '',
      reason: '',
      templateIdSelected: '',
      location: props.location
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) return this.autoCompleteForm()
  }

   /**
   * Auto Select videos
   */
  autoSelectVideo(search) {
    const searchText = search.cleanString()
    const videosDetected = this.props.context.state.videosDisplayed.filter(elem => elem.title.cleanString().search(searchText) !== -1 || elem.description.cleanString().search(searchText) !== -1)
    this.props.context.selectVideos(videosDetected)
  }

  autoCompleteForm() {
    const specialSearch = getUrlParameter('search_id')
    const search = this.props.context.state.searches.find(x => x.id == specialSearch) || {}
    const templateId = search.templateId || getUrlParameter('template_id')
    let searchValue = search.value || getUrlParameter('search_query')

    if (searchValue && (search.autoSelect || getUrlParameter('is_as') === 'true')) {
      searchValue = searchValue.replace(new RegExp("\\+", "g"), ' ').replace(new RegExp('\\"', "g"), '')
      this.autoSelectVideo(searchValue)
    }

    if (templateId) {
      const template = this.props.context.state.templates.find(x => x.id == templateId)
      if (!template) return

      return this.setState({
        flag_comments: template.description,
        reason: template.type,
        templateIdSelected: template.id
      })
    }
  }

  componentDidMount() {
    this.autoCompleteForm()
  }

  /**
   * On check/uncheck a video, edit videosDisplayed
   * @param {Video} video
   * @param {boolean} checked
   * @param {Object} context
   */
  handleSelectVideo(video, checked, context) {
    const { videosDisplayed } = context.state;
    const videoIndex = videosDisplayed.findIndex(elem => elem.id === video.id);
    videosDisplayed[videoIndex].selected = checked;
    return context.setState({ videosDisplayed })
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
            <Popup type="form-flagging">
              <FormReporting
                params={{
                  reason: this.state.reason,
                  flag_comments: this.state.flag_comments,
                  nbPage,
                  filterPeriod,
                  search,
                  token: context.state.session_token
                }}
                description={this.state.flag_comments}
                reason={this.state.reason}
                templateIdSelected={this.state.templateIdSelected}
                handleChange={this.handleChange}
              />
            </Popup>
            <input name="session_token" type="hidden" value={context.state.session_token}></input>
          </form>
        )}
      </YouTubeContext.Consumer>
    )
  }
}

export default FormFlagging
