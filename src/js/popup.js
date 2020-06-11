import React from 'react'
import { render } from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { links } from '@/js/config/config'
import { openInNewTab } from '@utils/browser'

function Popup() {
  const redirectToTabs = e => {
    e.preventDefault()
    const to = e.currentTarget.getAttribute('data-href')
    const url = `https://www.youtube.com${to}`
    return openInNewTab(url, true)
  }

  return (
    <nav className="navbar">
      <ul className="nav-link">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href} data-href={link.href} className="youtube-link" onClick={redirectToTabs}>
              <span className="span-icon">
                <FontAwesomeIcon icon={link.icon} size="1x" fixedWidth />
              </span>
              <span className="text-link">{link.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

render(<Popup />, document.getElementById('root'))
