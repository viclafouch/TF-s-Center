import React from 'react'
import Button from '../Button'
import CountVideos from './CountVideos/CountVideos';

const FlagTools = (context) => {
    return (
        <div className="flex-me flex-justify-between flex-align">
            <Button
                blue
                disabled={context.state.videosDisplayed.filter(x => x.selected === true).length === 0}
                className="mgi--right-10"
                onClick={() => context.setState('popupReportingOpened', true)}
            >Ajouter à la liste</Button>
            <CountVideos {...context } />
        </div>
    )
}

export default FlagTools
