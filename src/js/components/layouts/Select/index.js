import React from 'react'

const Select = (props) => {

    const defaultOptions = {
        className: '',
        disabled: false,
        defaultOptionTitle: 'defaultTitle'
    }

    let options = props.options || [];

    let className = 'tf-input-material '
    className = props.blue ? className + 'yt-uix-button-primary ' : className
    className = props.className ? className + props.className : className

    return (
        <select
            className={className}
            name={props.name}
            id={props.id || props.name}
            value={props.value}
            onChange={props.onChange}
            disabled={props.disabled || defaultOptions.disabled}
        >
            {!props.noEmptyOption && <option value="" disabled={!props.null}>{props.defaultOptionTitle || defaultOptions.defaultOptionTitle}</option>}
            {
                options.map((elem, index) =>
                    <option key={index} value={elem.value || index}>{elem.title || index}</option>
                )
            }

        </select>
    )
}

export default Select