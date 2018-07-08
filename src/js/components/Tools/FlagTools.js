import React from 'react'
import Button from '../Button'
import CountVideos from './CountVideos/CountVideos';
import { FilterPeriod } from './FilterPeriod/FilterPeriod';

const FlagTools = (context) => {
    return (
        <div className="flex-me flex-justify-between flex-align">
            <div className="flex-me">
                <Button
                    blue
                    disabled={context.state.videosDisplayed.filter(x => x.selected === true).length === 0}
                    className="mgi--right-10"
                    onClick={() => context.setState('popupReportingOpened', true)}
                >Ajouter à la liste</Button>
                <FilterPeriod />
                {/* <FilterPeriod></FilterPeriod> */}
            </div>

            <CountVideos {...context } />
        </div>
    )
}

export default FlagTools
