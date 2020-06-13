import React from 'react'
import './button.scoped.scss'

const colors = ['blue', 'white', 'red']

function Button(props) {
  let classNames = ['button']
  const { color, className, ...rest } = props
  if (colors.includes(color)) classNames.push(`button-${color}`)
  classNames = classNames.concat(className || [])
  return (
    <button {...rest} className={classNames.join(' ')} onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default Button
