import React from 'react'
import './sidebar.scoped.scss'

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="profile-wrapper">
        <img src="https://via.placeholder.com/112x112" alt="" />
      </div>
      <nav className="navbar">
        <ul className="nav-link">
          {this.links.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.url}
                className={`youtube-link ${url === link.url ? 'active' : ''}`}
                onClick={link.onClick ? (e) => link.onClick(e) : null}
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
            <a
              className="youtube-link"
              onClick={(e) => this.switchTheme(e, context)}
            >
              <span className="span-icon mgi--right-16">
                <FontAwesomeIcon
                  icon={context.state.theme === 'dark' ? faMoon : faMoonBis}
                  size="1x"
                  fixedWidth
                />
              </span>
              <span className="text-link">
                {context.state.theme === 'dark' ? 'Light' : 'Dark'} mode
              </span>
            </a>
          </li>
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
