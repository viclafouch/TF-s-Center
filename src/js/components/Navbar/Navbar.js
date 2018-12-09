import React, { Component } from 'react'
import FormSearch from '@components/FormSearch/FormSearch';
import { faDev } from '@fortawesome/free-brands-svg-icons/faDev'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import YouTubeLogo from '@img/YouTube_Logo'
import { YouTubeContext } from '@stores/YouTubeContext';

export class Navbar extends Component {

  constructor() {
    super()
    this.logo = React.createRef()
  }

  componentDidMount() {
    this.logo.current.innerHTML = YouTubeLogo
  }

  render() {
    return (
      <YouTubeContext.Consumer>
        {(context) =>
          <nav id="TF-navbar" className="navbar flex-me flex-align">
            <div className="block-left-side">
              <a href="/" className="logo_youtube" ref={this.logo}></a>
            </div>
            <div className="block-right-side flex-me flex-align flex-justify-between flex-one">
              <div className="flex-one form-search-container">
                <FormSearch {...context} />
              </div>
              <div className="nav-links mgi--left-10">
                <span className="span-icon clicked mgi--right-16" onClick={() => context.openModal('logs')}>
                  <FontAwesomeIcon icon={faDev} size="2x" fixedWidth />
                </span>
              </div>
            </div>
          </nav>
        }
      </YouTubeContext.Consumer>
    )
  }
}

export default Navbar
