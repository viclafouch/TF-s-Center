import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink, useLocation } from 'react-router-dom'
import { faComment } from '@fortawesome/free-solid-svg-icons/faComment'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons/faSignOutAlt'
import { links } from '@/js/config/config'
import './sidebar.scoped.scss'

function Sidebar() {
  const { pathname, search } = useLocation()

  const currentPath = pathname + search

  return (
    <aside className="sidebar">
      <div className="profile-wrapper">
        <img src="https://via.placeholder.com/112x112" alt="" />
      </div>
      <nav className="navbar">
        <ul className="nav-link">
          {links.map((link, index) => (
            <li key={index}>
              <NavLink
                exact
                to={link.href}
                className="youtube-link"
                isActive={() => link.href === currentPath}
                activeClassName="active"
              >
                <span className="span-icon">
                  <FontAwesomeIcon icon={link.icon} size="1x" fixedWidth />
                </span>
                <span className="text-link">{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="nav-link">
          <li>
            <a
              href="https://hangouts.google.com/webchat/start?action=chat&pi=100070124377981205858"
              target="_blank"
              rel="noreferrer"
              className="youtube-link"
            >
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
    </aside>
  )
}

export default Sidebar
