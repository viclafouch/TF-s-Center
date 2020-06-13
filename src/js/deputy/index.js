import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { getBrowserStorage } from '@utils/browser'
import Template from '@shared/models/Template.model'
import Search from '@shared/models/Search.model'
import { getVideosHistory } from './helpers/api'

const startDeputy = async ({ currentUrl }) => {
  document.documentElement.setAttribute('data-theme', 'dark')
  const div = document.createElement('div')
  div.setAttribute('id', 'TFsCenter')
  document.body.innerHTML = ''
  document.body.appendChild(div)
  document.querySelector('[name="www-core"]').remove()

  const videosHistory = await getVideosHistory({
    page: currentUrl.searchParams.get('page'),
    startTime: currentUrl.searchParams.get('start_time'),
    endTime: currentUrl.searchParams.get('end_time')
  })

  const localStorage = await getBrowserStorage('local', [
    { key: 'searches', default: [], parser: searches => searches.map(s => new Search(s)) },
    { key: 'templates', default: [], parser: templates => templates.map(t => new Template(t)) }
  ])

  const initialData = Object.assign({}, localStorage, { videosHistory })

  ReactDOM.render(<App initialData={initialData} />, div)
  document.body.classList.add('TFs-ready')
}

export default startDeputy
