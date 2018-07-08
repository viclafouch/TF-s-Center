import React from 'react'
import Button from '../Button'
import CountVideos from './CountVideos/CountVideos';
import { FilterPeriod } from './FilterPeriod/FilterPeriod';
import { ExcludeFlagged } from './ExcludeFlagged/ExcludeFlagged';

const FlagTools = (context) => {
    return (
        <div className="flex-me flex-justify-between flex-align">
            <div className="flex-me">
                <div className="mgi--right-10">
                    <Button
                        blue
                        disabled={context.state.videosDisplayed.filter(x => x.selected === true).length === 0}
                        onClick={() => context.setState('popupReportingOpened', true)}
                    >Ajouter à la liste</Button>
                </div>
                <div className="mgi--right-10">
                    <FilterPeriod />
                </div>
                <div className="mgi--right-10">
                    <ExcludeFlagged />
                </div>
            </div>

            <CountVideos {...context } />
        </div>
    )
}

export default FlagTools
