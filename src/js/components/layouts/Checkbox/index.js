import React from 'react'

const Checkbox = (props) => (
  <span
    className="yt-uix-form-input-checkbox-container"
    style={{
      height: 16,
      backgroundColor: '#F0F0F0',
      position: props.hide ? 'absolute' : 'relative',
      visibility: props.hide ? 'hidden' : 'visible',
    }}
  >
    <input
      className="yt-uix-form-input-checkbox"
      type="checkbox"
      checked={props.checked}
      name={props.name}
      id={props.id || props.name}
      onChange={props.onChange}
      disabled={props.disabled || false}
    />
    <span
      className="yt-uix-form-input-checkbox-element"
      style={{
        boxSizing: 'content-box',
      }}
    />
  </span>
)

export default Checkbox
