import React from 'react'
import { render } from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { links } from '@/js/config/config'
import { openInNewTab } from '@utils/browser'

function Popup() {
  const redirectToTabs = e => {
    e.preventDefault()
    const to = e.currentTarget.getAttribute('data-href')
    const external = e.currentTarget.getAttribute('data-external')
    const url = external ? to : `https://www.youtube.com${to}`
    openInNewTab(url, true)
  }

  return (
    <nav className="navbar">
      <ul className="nav-link">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              data-href={link.href}
              data-external={link.external}
              className="youtube-link"
              onClick={redirectToTabs}
            >
              <FontAwesomeIcon icon={link.icon} size="1x" fixedWidth />
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

render(<Popup />, document.getElementById('root'))
