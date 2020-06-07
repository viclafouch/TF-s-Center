import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { Redirect } from 'react-router'
import { getStorages } from '@stores/BrowserStorage'
import onClickOutside from 'react-onclickoutside'
import { getUrlParameter } from '@utils/index'

export class FormSearch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirectTo: null,
      showLastSearches: false,
      foundSearchesOnTap: [],
    }

    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate() {
    if (this.state.redirectTo) return this.setState({ redirectTo: null })
  }

  handleClickOutside() {
    this.setState({ showLastSearches: false })
  }

  handleFocus() {
    this.setState({ showLastSearches: true })
    this.foundWords(this.props.context.state.search)
  }

  async handleClickLastSearch(event, search) {
    event.preventDefault()
    this.props.context.setState({ search }, () => this.handleSubmit())
  }

  componentDidMount() {
    this.foundWords(this.props.context.state.search)
  }

  foundWords(value) {
    if (value.length > 2) {
      const wordsInput = value.split(' ')
      const foundSearchesOnTap = this.props.context.state.lastSearches.filter(
        (e) => e.split(' ').some((u) => wordsInput.includes(u))
      )
      this.setState({ foundSearchesOnTap })
    } else {
      this.setState({ foundSearchesOnTap: [] })
    }
  }

  handleChange(event) {
    this.foundWords(event.target.value)
    return this.props.context.setState({ search: event.target.value })
  }

  async handleSubmit(event) {
    event && event.preventDefault()
    const value = this.props.context.state.search.trim()
    if (value) {
      const query = value.replace(/\s+/g, '+')
      const isExcluded = !(getUrlParameter('exclude_flagged_videos') == 'false')
      const filters = getUrlParameter('filters')
      let redirectTo = `/deputy?search_query=${query}`
      if (filters) redirectTo += `&filters=${filters}`
      if (isExcluded) redirectTo += `&exclude_flagged_videos=${isExcluded}`
      this.setState({ redirectTo, showLastSearches: false })
      const { lastSearches } = await getStorages('local')
      if (lastSearches.includes(value)) {
        const lastSearchIndex = lastSearches.findIndex((x) => x === value)
        lastSearches.splice(lastSearchIndex, 1)
      }
      lastSearches.unshift(value)
      this.props.context.setState({ lastSearches: lastSearches.slice(0, 3) })
    }
  }

  render() {
    if (this.state.redirectTo) return <Redirect to={this.state.redirectTo} />
    return (
      <form
        className="flex-me form-search"
        id="search-form"
        action="GET"
        onSubmit={this.handleSubmit}
      >
        <div className="container-search-action">
          <input
            className="input-colored flex-one"
            placeholder="Search"
            type="text"
            onFocus={this.handleFocus}
            spellCheck="false"
            aria-label="Search"
            autoComplete="off"
            autoCorrect="off"
            tabIndex="0"
            onChange={this.handleChange}
            value={this.props.context.state.search}
          />
          {this.state.showLastSearches &&
            this.props.context.state.lastSearches.length > 0 && (
              <div className="lastSearches-container">
                <ul className="list-last-searches">
                  {this.props.context.state.lastSearches.map((elem, index) => (
                    <li
                      key={index}
                      className={`item-last-search ${
                        this.state.foundSearchesOnTap.includes(elem)
                          ? 'bold'
                          : ''
                      }`}
                      onClick={(event) =>
                        this.handleClickLastSearch(event, elem)
                      }
                    >
                      {elem}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
        <button className="button-search">
          <span className="span-icon">
            <FontAwesomeIcon icon={faSearch} size="1x" fixedWidth />
          </span>
        </button>
      </form>
    )
  }
}

export default onClickOutside(FormSearch)
