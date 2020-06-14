import React from 'react'
import './loader.scoped.scss'

function Loader({ spinner = false }) {
  if (spinner) {
    return <div className="loader"></div>
  } else {
    return <div className="loader loader-default" />
  }
}

export default Loader
