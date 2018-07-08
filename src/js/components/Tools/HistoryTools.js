import React from 'react'
import Button from '../Button';
import { YouTubeContext } from '../../main';
import CountVideos from './CountVideos/CountVideos';
import SelectingTime from './SelectingTime/SelectingTime';

const HistoryTools = () => {
    return (
        <YouTubeContext.Consumer>
            {(context) => (
                <React.Fragment>
                    <div className="flex-me flex-justify-between flex-align">
                        <div>
                            <Button
                                blue
                                className={"mgi--right-10 " + (context.state.hideRemoved ? 'active' : '')}
                                onClick={() => context.filterVideos('hideRemoved')}
                            >Hide removed videos</Button>
                            <Button
                                blue
                                className={"mgi--right-10 " + (context.state.hideReviewed ? 'active' : '')}
                                onClick={() => context.filterVideos('hideReviewed')}
                            >Hide reviewed videos</Button>
                        </div>
                        <CountVideos {...context} />
                    </div>
                    <div className="flex-me flex-justify-between flex-align mgi--top-10">
                        <SelectingTime />
                    </div>
                </React.Fragment>
            )}
        </YouTubeContext.Consumer>
    )
}

export default HistoryTools
