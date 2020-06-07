import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import DefaultProvider from './store/DefaultContext'
import Routes from './routes/routes'

function App({ initialData }) {
  return (
    <DefaultProvider initialState={initialData}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </DefaultProvider>
  )
}

export default App
