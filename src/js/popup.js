import React from 'react'
import { render } from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory } from '@fortawesome/free-solid-svg-icons/faHistory'
import { faFlag } from '@fortawesome/free-solid-svg-icons/faFlag'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { faBullseye } from '@fortawesome/free-solid-svg-icons/faBullseye'
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine'
import { openInNewTab } from '@utils/browser'

const links = [
  {
    label: 'History',
    svg: faHistory,
    href: '/flagging_history'
  },
  {
    label: 'Templates',
    svg: faFlag,
    href: '/deputy?context=templates'
  },
  {
    label: 'Searches',
    svg: faSearch,
    href: '/deputy?context=searches'
  },
  {
    label: 'Targets',
    svg: faBullseye,
    href: '/deputy?context=targets'
  },
  {
    label: 'Analytics',
    svg: faChartLine,
    href: '/deputy?context=stats'
  }
]

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
        {links.map((elem, index) => (
          <li key={index}>
            <a
              href={elem.href}
              data-href={elem.href}
              className="youtube-link"
              onClick={redirectToTabs}
            >
              <span className="span-icon">
                <FontAwesomeIcon icon={elem.svg} size="1x" fixedWidth />
              </span>
              <span className="text-link">{elem.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

render(<Popup />, document.getElementById('root'))
