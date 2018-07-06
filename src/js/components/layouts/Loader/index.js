import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner'


const Loader = () => {
    return (
        <div className="loader-tfs">
            <FontAwesomeIcon icon={faSpinner} pulse size="lg" />
        </div>
    )
}

export default Loader
