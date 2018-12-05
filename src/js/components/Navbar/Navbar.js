import React, { Component } from 'react'
import FormSearch from '@components/FormSearch/FormSearch';
import YouTubeLogo from '@img/YouTube_Logo'
import { YouTubeContext } from '@stores/YouTubeContext';

export class Navbar extends Component {

  componentDidMount() {
    this.refs.logo.innerHTML = YouTubeLogo
  }

  render() {
    return (
      <nav id="TF-navbar" className="navbar flex-me flex-align">
        <div className="block-left-side">
          <a href="/" className="logo_youtube" ref="logo"></a>
        </div>
        <div className="block-right-side flex-me flex-justify-between flex-one">
          <div className="flex-one form-search-container">
            <YouTubeContext.Consumer>
              {(context) => <FormSearch {...context} /> }
            </YouTubeContext.Consumer>
          </div>
          <div className="nav-links">
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
