import React from 'react'

const Popup = (props) => {
    return (
        <div className={"popup " + (props.isOpen ? "active" : '')}>
            <div className="overlay" onClick={props.onClosed}></div>
            <div className="container">
                {props.children}
            </div>
        </div>
    )
}

export default Popup
