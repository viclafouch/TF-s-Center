import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { getBrowserStorage } from '@utils/browser'
import { pageLoaded, extractUserInfos } from './helpers/dom'
import Template from '@shared/models/Template.model'
import Search from '@shared/models/Search.model'
import { getAnalytics } from './helpers/api'

const startDeputy = async ({ currentUrl }) => {
  try {
    document.documentElement.setAttribute('data-theme', 'dark')
    const div = document.createElement('div')
    div.setAttribute('id', 'TFsCenter')

    await pageLoaded()

    const defaultData = await getBrowserStorage('local', [
      { key: 'searches', default: [], parser: searches => searches.map(s => new Search(s)) },
      { key: 'templates', default: [], parser: templates => templates.map(t => new Template(t)) }
    ])

    const user = extractUserInfos()
    const analytics = await getAnalytics()

    const domData = { user, analytics }

    document.body.innerHTML = ''

    const modal = document.createElement('div')
    modal.setAttribute('id', 'root-modal')
    document.body.appendChild(modal)

    ReactDOM.render(<App defaultData={defaultData} domData={domData} />, div)
    document.body.classList.add('TFs-ready')

    document.body.appendChild(div)
    document.querySelector('[name="www-core"]').remove()
  } catch (error) {
    console.error(error)
  }
}

export default startDeputy
