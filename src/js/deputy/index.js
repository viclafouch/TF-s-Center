import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { getBrowserStorage } from '@utils/browser'

const startDeputy = async () => {
  document.documentElement.setAttribute('data-theme', 'dark')
  const div = document.createElement('div')
  div.setAttribute('id', 'TFsCenter')
  document.body.innerHTML = ''
  document.body.appendChild(div)
  const localStorage = await getBrowserStorage('local', ['searches'])
  ReactDOM.render(<App initialData={localStorage} />, div)
  document.body.classList.add('TFs-ready')
}

export default startDeputy
