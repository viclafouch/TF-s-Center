import React from 'react'
import Button from '../Button';
import { YouTubeContext } from '../../main';
import CountVideos from './CountVideos/CountVideos';

const HistoryTools = () => {
    return (
        <YouTubeContext.Consumer>
            {(context) => (
                <div className="flex-me flex-justify-between flex-align">
                    <div>
                        <Button
                            blue
                            className={"mgi--right-10 " + (context.state.hideRemoved ? 'active' : '')}
                            onClick={() => context.filterVideos('hideRemoved')}
                        >Cacher les vidéos supprimées</Button>
                        <Button
                            blue
                            className={"mgi--right-10 " + (context.state.hideReviewed ? 'active' : '')}
                            onClick={() => context.filterVideos('hideReviewed')}
                        >Cacher les vidéos déjà reviewed</Button>
                    </div>
                    <CountVideos {...context} />
                </div>
            )}
        </YouTubeContext.Consumer>
    )
}

export default HistoryTools
