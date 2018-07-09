import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory } from '@fortawesome/free-solid-svg-icons/faHistory'
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine'
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers'
import { faComment } from '@fortawesome/free-solid-svg-icons/faComment'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt'
import { faFlag } from '@fortawesome/free-solid-svg-icons/faFlag'
import { EMAIL_TRUSTED_FLAGGERS, CONTRIBUTOR_LINK, HANGOUTS_ME } from '../../../../private'
import { YouTubeContext } from '../../main';
import { urlsAvailable } from '../../config';

export class Sidebar extends Component {
    render() {
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
                                    <YouTubeContext.Consumer>
                                        {(context) => (
                                            <a href="/flagging_history" className={'youtube-link '+(context.state.pathname === urlsAvailable[0] ? 'active' : '')}>
                                                <span className="span-icon mgi--right-16">
                                                    <FontAwesomeIcon icon={faHistory} size="1x" fixedWidth />
                                                </span>
                                                <span className="text-link">History</span>
                                            </a>
                                        )}
                                    </YouTubeContext.Consumer>
                                </li>
                                <li>
                                    <a href="/deputy?context=templates" className={'youtube-link ' + (context.state.pathname === urlsAvailable[3] ? 'active' : '')}>
                                        <span className="span-icon mgi--right-16">
                                            <FontAwesomeIcon icon={faFlag} size="1x" fixedWidth />
                                        </span>
                                        <span className="text-link">Templates</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/deputy" className={'youtube-link ' + (context.state.pathname === urlsAvailable[2] ? 'active' : '')}>
                                        <span className="span-icon mgi--right-16">
                                            <FontAwesomeIcon icon={faChartLine} size="1x" fixedWidth />
                                        </span>
                                        <span className="text-link">Statistics</span>
                                    </a>
                                </li>
                                <li>
                                    <a href={CONTRIBUTOR_LINK} className="youtube-link">
                                        <span className="span-icon mgi--right-16">
                                            <FontAwesomeIcon icon={faUsers} size="1x" fixedWidth />
                                        </span>
                                        <span className="text-link">Trusted Flagger Forum</span>
                                    </a>
                                </li>
                                <li>
                                    <a href={`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${EMAIL_TRUSTED_FLAGGERS}`} target="_blank" className="youtube-link">
                                        <span className="span-icon mgi--right-16">
                                            <FontAwesomeIcon icon={faEnvelope} size="1x" fixedWidth />
                                        </span>
                                        <span className="text-link">Send mail</span>
                                    </a>
                                </li>
                            </ul>
                            <ul className="nav-link">
                                <li>
                                    <a href={HANGOUTS_ME} target="_blank" className="youtube-link">
                                        <span className="span-icon mgi--right-16">
                                            <FontAwesomeIcon icon={faComment} size="1x" fixedWidth />
                                        </span>
                                        <span className="text-link">Help</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="/logout" className="youtube-link">
                                        <span className="span-icon mgi--right-16">
                                            <FontAwesomeIcon icon={faSignOutAlt} size="1x" fixedWidth />
                                        </span>
                                        <span className="text-link">Logout</span>
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
