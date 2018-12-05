import React from 'react'

const Button = (props) => {
  let className = 'yt-uix-button yt-uix-button-size-default '
  if (props.blue) className = className + 'yt-uix-button-primary '
  else className = className + 'yt-uix-white-primary '
  className = (props.className) ? className+props.className : className

  return (
    <button
      className={className}
      id={props.id}
      name={props.name || ''}
      disabled={props.disabled || false}
      onClick={props.onClick}
      type={props.type || "button"}
    >
      {props.children}
      </button>
  )
}

export default Button
