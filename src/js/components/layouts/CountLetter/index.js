import React from 'react'

const CountLetter = ({text, limit, className, style}) => {
    return (
        <div className={"countletter " + className ? className : ''} style={style || {}}>
            <span>{text.trim().length}</span>
            {' / '}
            <span>{limit}</span>
        </div>
    )
}

export default CountLetter
