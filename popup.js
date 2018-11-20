import React, { Component } from 'react';
import { render } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory } from '@fortawesome/free-solid-svg-icons/faHistory'
import { faFlag } from '@fortawesome/free-solid-svg-icons/faFlag'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { faBullseye } from '@fortawesome/free-solid-svg-icons/faBullseye'
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine'


class Popup extends Component {

  constructor() {
    super();

    this.state = {
      links: [
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
          href: '/deputy'
        },
        {
          label: 'Analytics',
          svg: faChartLine,
          href: '/deputy?context=stats'
        },
      ]
    }
  }

  redirectToTabs(e) {
    e.preventDefault();
    let url = e.currentTarget.getAttribute('data-href');
    url = `https://www.youtube.com${url}`
    return chrome.tabs.create({
      active: true,
      url: url,
      pinned: false
    });
  }

  render() {
    return (
      <nav className="navbar">
        <ul className="nav-link">
        {
          this.state.links.map((elem, index) => {
            return (
              <li key={index}>
                <a href={elem.href} data-href={elem.href} className='youtube-link' onClick={this.redirectToTabs}>
                  <span className="span-icon">
                    <FontAwesomeIcon icon={elem.svg} size="1x" fixedWidth />
                  </span>
                  <span className="text-link">{elem.label}</span>
                </a>
              </li>
            )
          })
        }
        </ul>
      </nav>
    )
  }
}


render(<Popup></Popup>,
  document.getElementById('root')
);