import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import DefaultProvider from './store/DefaultContext'
import Routes from './routes/routes'
import DomProvider from './store/DomContext'

function App({ defaultData, domData }) {
  return (
    <DomProvider initialState={domData}>
      <DefaultProvider initialState={defaultData}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </DefaultProvider>
    </DomProvider>
  )
}

export default App
