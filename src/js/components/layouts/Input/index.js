import React from 'react'

const Input = (props) => {
  const defaultOptions = {
    type: 'text',
    spellCheck: true,
    autoComplete: 'on',
    placeholder: '',
    disabled: false,
    maxLength: 524288,
    minLength: 0,
    step: 1,
  }

  let className = 'tf-input-material '
  className = props.className ? className + props.className : className

  return (
    <input
      className={className}
      id={props.name}
      name={props.name}
      type={props.type || defaultOptions.type}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      step={props.step || 1}
      placeholder={props.placeholder || defaultOptions.placeholder}
      spellCheck={props.spellCheck || defaultOptions.spellCheck}
      autoComplete={props.autoComplete || defaultOptions.autoComplete}
      disabled={props.disabled || defaultOptions.disabled}
      maxLength={props.maxLength || defaultOptions.maxLength}
      minLength={props.minLength || defaultOptions.minLength}
    />
  )
}

export default Input
