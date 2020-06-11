import React, { Component } from 'react'
import Textarea from '@components/layouts/Textarea'
import Button from '@components/Button'
import { YouTubeContext } from '@stores/YouTubeContext'
import CountLetter from '@components/layouts/CountLetter'
import Select from '@components/layouts/Select'
import { labels } from '../../config/config'
import { getUrlParameter } from '@utils'

export class FormReporting extends Component {
  constructor() {
    super()

    this.state = {
      reasonEmpty: false
    }

    this.handleClickSubmit = this.handleClickSubmit.bind(this)
  }

  /**
   * On submit the form
   * Add length of videos selected to date today
   * (if) Add length of videos selected to the special search
   * (if) Add length of videos selected to the the template
   * @param {Event} e - Event user
   * @param {Object} context - Youtube Context
   */
  async handleClickSubmit(e, context) {
    e.preventDefault()
    if (!this.props.reason) return this.setState({ reasonEmpty: true })
    const params = {
      video_ids: context.state.videosDisplayed.map(e => e.id),
      filters: this.props.params.filters,
      search_query: this.props.params.search,
      page: this.props.params.nbPage,
      flag_comments: this.props.params.flag_comments,
      video_report_reason: this.props.params.reason,
      templateId: this.props.templateIdSelected,
      searchId: getUrlParameter('search_id'),
      nbReported: context.state.videosDisplayed.filter(elem => elem.selected).length,
      selected_vid: context.state.videosDisplayed.filter(elem => elem.selected).map(e => e.id)
    }

    return context.flagVideos(params)
  }

  /**
   * (if) reset error
   * @param {Object} nextProps
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.reason) return this.setState({ reasonEmpty: false })
  }

  render() {
    return (
      <div className="form-reporting">
        <div className="pdi--20">
          <YouTubeContext.Consumer>
            {context => (
              <div className="flex-me flex-justify-between">
                <h2>Report videos ({context.state.videosDisplayed.filter(x => x.selected === true).length})</h2>
                <div>
                  <Select
                    options={context.state.templates.map(({ title, id }) => ({
                      title,
                      id
                    }))}
                    className="input-colored"
                    defaultOptionTitle="Choose template"
                    null
                    name="templateIdSelected"
                    value={this.props.templateIdSelected}
                    onChange={e => this.props.handleChange(e, context)}
                  />
                </div>
              </div>
            )}
          </YouTubeContext.Consumer>
          <fieldset className="form-reporting-fieldset">
            <legend className={`yt-uix-form-legend ${this.state.reasonEmpty ? 'red-color' : ''}`}>{`What's the issue ?`}</legend>
            <ul className="yt-uix-form-list-option paper-list">
              {labels.map((elem, index) => (
                <li key={index} className="paper-item">
                  <label>
                    <span className="paper-radio">
                      <input
                        type="radio"
                        className="yt-uix-form-input-radio deputy-flag-reason"
                        name="reason"
                        onChange={this.props.handleChange}
                        checked={this.props.reason === elem.value}
                        value={elem.value}
                      />
                      <span className="paper-radio-element" />
                    </span>
                    <div className="mgi--left-12">
                      <span>{elem.title}</span>
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
          <fieldset className="form-reporting-fieldset">
            <Textarea
              className="scrollBarOnHover input-colored"
              placeholder="Provide additional details"
              value={this.props.description}
              name="flag_comments"
              spellCheck="false"
              maxLength="500"
              onChange={this.props.handleChange}
            />
          </fieldset>
          <CountLetter text={this.props.description} limit={500} style={{ textAlign: 'right' }} />
        </div>
        <div className="form-reporting-fieldset buttons">
          <div className="mgi--left-10">
            <Button type="button" white onClick={() => this.props.closeModal()}>
              Close
            </Button>
          </div>
          <div className="mgi--left-10">
            <YouTubeContext.Consumer>
              {context => (
                <Button type="submit" blue onClick={e => this.handleClickSubmit(e, context)}>
                  Submit
                </Button>
              )}
            </YouTubeContext.Consumer>
          </div>
        </div>
      </div>
    )
  }
}

export default FormReporting
