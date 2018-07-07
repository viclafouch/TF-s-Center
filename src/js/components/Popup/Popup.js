import React from 'react'

const Popup = (props) => {
    console.log(props);

    return (
        <div className={"popup " + (props.isOpen ? "active" : '')}>
            <div className="overlay" onClick={props.onClosed}></div>
            <div className="container" style={{
                maxWidth: props.maxWidth || ''
            }}>
                {props.children}
            </div>
        </div>
    )
}

export default Popup
