import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { Redirect } from 'react-router'
import { getAllUrlParams } from '@utils/index';

export class FormSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: props.state.search,
      redirectTo: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate() {
    if (this.state.redirectTo) return this.setState({ redirectTo: null})
  }

  handleChange(event) {
    return this.setState({ search: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const params = getAllUrlParams()
    if (this.state.search && params.search_query !== this.state.search.trim()) {
      const query = this.state.search.trim().replace(/\s+/g, "+")
      return this.setState({ redirectTo: `/deputy?search_query=${query}` })
    }
  }

  render() {
    if (this.state.redirectTo) return <Redirect to={this.state.redirectTo} />
    return (
      <form className="flex-me form-search" id="search-form" action="GET" onSubmit={this.handleSubmit}>
        <input
          className="input-colored flex-one"
          placeholder="Search"
          type="text"
          spellCheck="false"
          aria-label="Search"
          autoComplete="off"
          autoCorrect="off"
          tabIndex="0"
          onChange={this.handleChange}
          value={this.state.search}
        />
        <button className="button-search">
          <span className="span-icon">
            <FontAwesomeIcon icon={faSearch} size="1x" fixedWidth />
          </span>
        </button>
      </form>
    )
  }
}

export default FormSearch
