import React from 'react'

const CountLetter = ({text, limit, className, style}) => {

    let quota = text.trim().length / limit;

    return (
        <div className={"countletter " + (className ? className : '')} style={style || {}}>
            <span className={(quota < 0.75 ? '' : quota < 0.90 ? 'orange-color' : 'red-color')}>{text.trim().length}</span>
            {' / '}
            <span>{limit}</span>
        </div>
    )
}

export default CountLetter
