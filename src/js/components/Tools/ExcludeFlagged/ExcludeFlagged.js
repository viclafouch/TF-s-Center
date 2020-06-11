import React, { Component } from 'react'
import Checkbox from '@components/layouts/Checkbox'
import { Redirect } from 'react-router'
import { getUrlParameter, updateQueryStringParameter } from '@utils'

export class ExcludeFlagged extends Component {
  constructor() {
    super()
    this.state = {
      isExcluded: true,
      redirectTo: null
    }
    this.handleChange = this.handleChange.bind(this)
  }

  /* Check the param in url and set it to the state */
  componentDidMount() {
    const isExcluded = !(getUrlParameter('exclude_flagged_videos') == 'false')
    return this.setState({ isExcluded })
  }

  /* Reset redirectTo if a redirection has been set */
  componentDidUpdate() {
    if (this.state.redirectTo) return this.setState({ redirectTo: null })
  }

  /**
   * On change checkbox
   * Create a redirection to the specific search
   * @param {Event} e - Event user
   */
  handleChange(e) {
    const value = e.target.checked
    if (this.props.disabled) return

    let url = window.location.pathname + window.location.search
    url = updateQueryStringParameter(url, 'exclude_flagged_videos', value)

    return this.setState({ redirectTo: url, isExcluded: value })
  }

  render() {
    if (this.state.redirectTo) return <Redirect to={this.state.redirectTo} />
    return (
      <div className={`tool tools-exclude-flagged ${this.props.disabled ? 'tool-disabled' : ''}`}>
        <label
          className="yt-uix-button yt-uix-button-size-default yt-uix-button-primary flex-me flex-align"
          htmlFor="excluded-flagged"
        >
          <span className="mgi--right-6">Exclude previously flagged videos</span>
          <Checkbox
            disabled={this.props.disabled}
            checked={this.state.isExcluded}
            onChange={this.handleChange}
            name="excluded-flagged"
          />
        </label>
      </div>
    )
  }
}

export default ExcludeFlagged
