import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { getBrowserStorage } from '@utils/browser'
import Template from '@shared/models/Template.model'
import Search from '@shared/models/Search.model'

const startDeputy = async () => {
  document.documentElement.setAttribute('data-theme', 'dark')
  const div = document.createElement('div')
  div.setAttribute('id', 'TFsCenter')
  document.body.innerHTML = ''
  document.body.appendChild(div)
  document.querySelector('[name="www-core"]').remove()
  const localStorage = await getBrowserStorage('local', [
    { key: 'searches', default: [], parser: searches => searches.map(s => new Search(s)) },
    { key: 'templates', default: [], parser: templates => templates.map(t => new Template(t)) }
  ])
  ReactDOM.render(<App initialData={localStorage} />, div)
  document.body.classList.add('TFs-ready')
}

export default startDeputy
