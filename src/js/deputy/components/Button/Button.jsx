import React from 'react'
import './button.scoped.scss'

const colors = ['blue', 'white', 'red', 'orange']
const sizes = ['small', 'medium', 'big']

function Button(props) {
  let classNames = ['button']
  const { color, className, isLoading, size, ...rest } = props
  if (colors.includes(color)) classNames.push(`button-${color}`)
  if (sizes.includes(size)) classNames.push(`button-${size}`)
  else classNames.push(`button-${sizes[1]}`)
  classNames = classNames.concat(className || [])
  return (
    <button {...rest} className={classNames.join(' ')} onClick={props.onClick}>
      {props.children}
      {isLoading && <span className="button-is-loading"></span>}
    </button>
  )
}

export default Button
