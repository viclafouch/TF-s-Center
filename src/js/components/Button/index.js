import React from 'react'

const Button = (props) => {
    return (
        <button
            className="yt-uix-button yt-uix-button-size-default yt-uix-button-primary"
            id={props.id}
            onClick={props.onClick}
            type={props.type || "button"}
        >
        {props.children}
        </button>
    )
}

export default Button
