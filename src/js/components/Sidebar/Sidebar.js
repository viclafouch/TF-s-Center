import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory } from '@fortawesome/free-solid-svg-icons/faHistory'
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine'
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers'
import { faComment } from '@fortawesome/free-solid-svg-icons/faComment'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { faFlag } from '@fortawesome/free-solid-svg-icons/faFlag'
import { faMoon as faMoonBis } from '@fortawesome/free-solid-svg-icons/faMoon'
import { faMoon } from '@fortawesome/free-regular-svg-icons/faMoon'
import { faBullseye } from '@fortawesome/free-solid-svg-icons/faBullseye'
import { YouTubeContext } from '@stores/YouTubeContext'
import { NavLink } from 'react-router-dom'
import { HANGOUTS_ME } from '@private'

export class Sidebar extends Component {
  constructor(props) {
    super(props)

    this.links = [
      {
        url: '/flagging_history',
        icon: faHistory,
        label: 'History'
      },
      {
        url: '/deputy?context=templates',
        icon: faFlag,
        label: 'Templates'
      },
      {
        url: '/deputy?context=searches',
        icon: faSearch,
        label: 'Searches'
      },
      {
        url: '/deputy?context=stats',
        icon: faChartLine,
        label: 'Analytics'
      },
      {
        url: '/deputy?context=targets',
        icon: faBullseye,
        label: 'Targets'
      }
    ]
  }

  async switchTheme(event, context) {
    event.preventDefault()
    const theme = context.state.theme === 'light' ? 'dark' : 'light'
    document.getElementById('TFsCenter').classList.add('color-theme-in-transition')
    document.documentElement.setAttribute('data-theme', theme)
    context.setState({ theme })
    setTimeout(() => document.getElementById('TFsCenter').classList.remove('color-theme-in-transition'), 1000)
  }

  render() {
    const url = this.props.location.pathname + this.props.location.search
    return (
      <YouTubeContext.Consumer>
        {context => (
          <div className="sidebar">
            <div className="profile-wrapper">
              <img src={context.state.user.avatar} alt={context.state.user.username} />
            </div>
            <nav className="navbar">
              <ul className="nav-link">
                {this.links.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      to={link.url}
                      className={`youtube-link ${url === link.url ? 'active' : ''}`}
                      onClick={link.onClick ? e => link.onClick(e) : null}
                      activeClassName="active"
                    >
                      <span className="span-icon mgi--right-16">
                        <FontAwesomeIcon icon={link.icon} size="1x" fixedWidth />
                      </span>
                      <span className="text-link">{link.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
              <ul className="nav-link">
                <li>
                  <a className="youtube-link" onClick={e => this.switchTheme(e, context)}>
                    <span className="span-icon mgi--right-16">
                      <FontAwesomeIcon icon={context.state.theme === 'dark' ? faMoon : faMoonBis} size="1x" fixedWidth />
                    </span>
                    <span className="text-link">{context.state.theme === 'dark' ? 'Light' : 'Dark'} mode</span>
                  </a>
                </li>
                <li>
                  <a href={HANGOUTS_ME} target="_blank" className="youtube-link">
                    <span className="span-icon mgi--right-16">
                      <FontAwesomeIcon icon={faComment} size="1x" fixedWidth />
                    </span>
                    <span className="text-link">Help</span>
                  </a>
                </li>
                <li>
                  <a href="/" className="youtube-link">
                    <span className="span-icon mgi--right-16">
                      <FontAwesomeIcon icon={faSignOutAlt} size="1x" fixedWidth />
                    </span>
                    <span className="text-link">Exit</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </YouTubeContext.Consumer>
    )
  }
}

export default Sidebar
