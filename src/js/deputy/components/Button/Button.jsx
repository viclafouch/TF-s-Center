import React from 'react'
import './button.scoped.scss'

const colors = ['blue', 'white', 'red']

function Button(props) {
  let classNames = ['button']
  const { color, className, isLoading, ...rest } = props
  if (colors.includes(color)) classNames.push(`button-${color}`)
  classNames = classNames.concat(className || [])
  return (
    <button {...rest} className={classNames.join(' ')} onClick={props.onClick}>
      {props.children}
      {isLoading && <span className="button-is-loading"></span>}
    </button>
  )
}

export default Button
