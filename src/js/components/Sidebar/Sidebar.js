import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory } from '@fortawesome/free-solid-svg-icons/faHistory'
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine'
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers'
import { faComment } from '@fortawesome/free-solid-svg-icons/faComment'
import { faDev } from '@fortawesome/free-brands-svg-icons/faDev'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { faFlag } from '@fortawesome/free-solid-svg-icons/faFlag'
import { faMoon as faMoonBis } from '@fortawesome/free-solid-svg-icons/faMoon'
import { faMoon } from '@fortawesome/free-regular-svg-icons/faMoon'
import { faBullseye } from '@fortawesome/free-solid-svg-icons/faBullseye'
import { CONTRIBUTOR_LINK, HANGOUTS_ME } from '../../../../private'
import { YouTubeContext } from '@stores/YouTubeContext';
import { NavLink } from 'react-router-dom'

export class Sidebar extends Component {

    async switchTheme(event, context) {
      event.preventDefault();
      const theme = context.state.theme === 'light' ? 'dark' : 'light'
      document.getElementById('TFsCenter').classList.add('color-theme-in-transition')
      document.documentElement.setAttribute('data-theme', theme)
      context.setState('theme', theme)
      setTimeout(() => document.getElementById('TFsCenter').classList.remove('color-theme-in-transition'), 1000);
    }

    openPopup(event, context) {
      event.preventDefault();
      context.openModal('logs')
    }

    render() {
        const url = this.props.location.pathname + this.props.location.search
        return (
            <YouTubeContext.Consumer>
                {(context) => (
                    <div className="sidebar">
                        <div className="profile-wrapper">
                            <img src={context.state.user.avatar} alt={context.state.user.username} />
                        </div>
                        <nav className="navbar">
                            <ul className="nav-link">
                                <li>
                                    <NavLink
                                      to="/flagging_history"
                                      className="youtube-link"
                                      activeClassName="active">
                                        <span className="span-icon mgi--right-16">
                                          <FontAwesomeIcon icon={faHistory} size="1x" fixedWidth />
                                        </span>
                                        <span className="text-link">History</span>
                                    </NavLink>
                                </li>
                                <li>
                                  <NavLink
                                    to="/deputy?context=templates"
                                    className={'youtube-link ' + (url === "/deputy?context=templates" ? 'active' : '')}
                                    activeClassName="active">
                                    <span className="span-icon mgi--right-16">
                                      <FontAwesomeIcon icon={faFlag} size="1x" fixedWidth />
                                    </span>
                                    <span className="text-link">Templates</span>
                                  </NavLink>
                                </li>
                                <li>
                                  <NavLink
                                    to="deputy?context=searches"
                                    className={'youtube-link ' + (url === "/deputy?context=searches" ? 'active' : '')}
                                    >
                                      <span className="span-icon mgi--right-16">
                                        <FontAwesomeIcon icon={faSearch} size="1x" fixedWidth />
                                      </span>
                                      <span className="text-link">Searches</span>
                                  </NavLink>
                                </li>
                                <li>

                                </li>
                                <li>
                                  <NavLink
                                    to="deputy?context=stats"
                                    className={'youtube-link ' + (url === "/deputy?context=stats" ? 'active' : '')}
                                    >
                                      <span className="span-icon mgi--right-16">
                                        <FontAwesomeIcon icon={faChartLine} size="1x" fixedWidth />
                                      </span>
                                      <span className="text-link">Analytics</span>
                                  </NavLink>
                                </li>
                                <li>
                                    <a href={CONTRIBUTOR_LINK} className="youtube-link">
                                        <span className="span-icon mgi--right-16">
                                            <FontAwesomeIcon icon={faUsers} size="1x" fixedWidth />
                                        </span>
                                        <span className="text-link">Forum</span>
                                    </a>
                                </li>
                                <li>
                                    <a href={window.location.href + '#logs'} onClick={e => this.openPopup(e, context)} className="youtube-link">
                                        <span className="span-icon mgi--right-16">
                                            <FontAwesomeIcon icon={faDev} size="1x" fixedWidth />
                                        </span>
                                        <span className="text-link">Logs</span>
                                    </a>
                                </li>
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
