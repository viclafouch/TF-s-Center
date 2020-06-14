import React from 'react'
import spinnerImg from '@/img/spinner.gif'
import darkSheriff from '@/img/loader-dark.svg'
// import lightSheriff from '@/img/loader-light.svg'

import './loader.scoped.scss'

function Loader({ spinner = false }) {
  console.log(spinner)

  return (
    <div className="loader loader-spinner" aria-busy="true">
      {spinner ? (
        <img src={spinnerImg} alt="loading" width="36" height="36" />
      ) : (
        <img src={darkSheriff} alt="loading" width="140" height="140" />
      )}
    </div>
  )
}

export default Loader
