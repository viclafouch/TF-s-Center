import React from 'react'
import Button from '../Button';
import { YouTubeContext } from '../../content_script';
import CountVideos from './CountVideos/CountVideos';
import SelectingTime from './SelectingTime/SelectingTime';
import { SelectDisplay } from './SelectDisplay/SelectDisplay';

const HistoryTools = () => {
    return (
        <YouTubeContext.Consumer>
            {(context) => (
                <React.Fragment>
                    <div className="flex-me flex-justify-between flex-align">
                        <div className="flex-me">
                            <div className="mgi--right-10">
                                <Button
                                    blue
                                    className={(context.state.hideRemoved ? 'active' : '')}
                                    onClick={() => context.filterVideos('hideRemoved')}
                                >Hide removed videos</Button>
                            </div>
                            <div className="mgi--right-10">
                                <Button
                                    blue
                                    className={(context.state.hideReviewed ? 'active' : '')}
                                    onClick={() => context.filterVideos('hideReviewed')}
                                >Hide reviewed videos</Button>
                            </div>
                            <div className="mgi--right-10">
                                <SelectDisplay />
                            </div>

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
