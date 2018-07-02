import React from 'react'

const Button = (props) => {

    let className = 'yt-uix-button yt-uix-button-size-default yt-uix-button-primary '
    className = (props.className) ? className+props.className : className

    return (
        <button
            className={className}
            id={props.id}
            onClick={props.onClick}
            type={props.type || "button"}
        >
        {props.children}
        </button>
    )
}

export default Button
