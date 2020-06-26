import React from 'react'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import DefaultProvider from './store/DefaultContext'
import Routes from './routes/routes'
import DomProvider from './store/DomContext'
import 'react-toastify/dist/ReactToastify.css'

function App({ defaultData, domData }) {
  return (
    <DomProvider initialState={domData}>
      <DefaultProvider initialState={defaultData}>
        <BrowserRouter>
          <ToastContainer hideProgressBar newestOnTop />
          <Routes />
        </BrowserRouter>
      </DefaultProvider>
    </DomProvider>
  )
}

export default App
