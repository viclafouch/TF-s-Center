import React from 'react'
import './button.scoped.scss'

const colors = ['blue', 'white']

function Button(props) {
  const className = ['button']
  const { color, ...rest } = props
  if (colors.includes(color)) className.push(`button-${color}`)
  return (
    <button {...rest} className={className.join(' ')} onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default Button
