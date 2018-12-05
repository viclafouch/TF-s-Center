import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'

export class FormSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: props.state.search
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ search: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <form className="flex-me form-search" id="search-form" action="POST" onSubmit={this.handleSubmit}>
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
