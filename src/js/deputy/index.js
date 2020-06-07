import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

const startDeputy = () => {
  document.documentElement.setAttribute('data-theme', 'dark')
  document.body.classList.add('TFs-ready')
  const div = document.createElement('div')
  div.setAttribute('id', 'TFsCenter')
  document.body.innerHTML = ''
  document.body.appendChild(div)
  ReactDOM.render(<App initialData={null} />, div)
}

export default startDeputy
