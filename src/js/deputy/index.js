import React from 'react'
import ReactDOM from 'react-dom'
import { formatISO } from 'date-fns'
import App from './App'
import { getBrowserStorage } from '@utils/browser'
import { pageLoaded, extractUserInfos } from './helpers/dom'
import Template from '@shared/models/Template.model'
import Search from '@shared/models/Search.model'
import Video from '@shared/models/Video.model'
import { getAnalytics } from './helpers/api'
import { randomId } from '@utils/index'
import { lastSevenDays } from '@utils/date'
import '@scss/deputy.scss'

const startDeputy = async () => {
  try {
    const fontLink = document.createElement('link')
    fontLink.rel = 'stylesheet'
    fontLink.href = 'https://fonts.googleapis.com/css?family=YT+Sans:300,500,700'
    document.head.append(fontLink)
    document.documentElement.setAttribute('data-theme', 'dark')
    const div = document.createElement('div')
    div.setAttribute('id', 'TFsCenter')

    await pageLoaded()

    const defaultData = await getBrowserStorage('local', [
      { key: 'searches', default: [], parser: searches => searches.map(s => new Search(s)) },
      { key: 'templates', default: [], parser: templates => templates.map(t => new Template(t)) },
      { key: 'lastSearches', default: [] },
      { key: 'enableTargets', default: true },
      {
        key: 'lastReportedEntities',
        default: lastSevenDays.map(date => ({
          date: formatISO(date),
          videos: 0,
          channels: 0,
          id: randomId()
        })),
        parser: lastReported =>
          lastSevenDays.map(date => {
            const report = lastReported.find(reported => reported.date === formatISO(date))
            if (report) {
              return report
            } else {
              return {
                date: formatISO(date),
                videos: 0,
                channels: 0,
                id: randomId()
              }
            }
          })
      }
    ])

    const user = extractUserInfos()
    const analytics = await getAnalytics()

    const domData = { user, analytics }

    document.body.innerHTML = ''

    const modal = document.createElement('div')
    modal.setAttribute('id', 'root-modal')
    document.body.appendChild(modal)

    ReactDOM.render(<App defaultData={defaultData} domData={domData} />, div)
    document.body.removeAttribute('class')
    document.body.classList.add('TFs-ready')

    document.querySelectorAll('link[rel="stylesheet"]').forEach(item => {
      if (!item.href.startsWith('https://fonts.googleapis.com')) item.remove()
    })
    document.body.appendChild(div)
  } catch (error) {
    console.error(error)
  }
}

startDeputy()
