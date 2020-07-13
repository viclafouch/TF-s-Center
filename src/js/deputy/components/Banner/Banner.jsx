import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons/faExclamationTriangle'
import './banner.scoped.scss'

function Banner() {
  return (
    <div className="banner">
      <FontAwesomeIcon icon={faExclamationTriangle} size="1x" fixedWidth />
      This page will go away soon following the consolidation of the flagging history pages. Please use the new{' '}
      <a href="/reporthistory">Report History</a> to review your flagging activity.
    </div>
  )
}

export default Banner
