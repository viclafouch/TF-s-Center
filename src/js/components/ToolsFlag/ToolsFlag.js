import React, { Component } from 'react'
import Pagination from '../Tools/Pagination/Pagination'
import { YouTubeContext } from '../../main';
import FlagTools from '../Tools/FlagTools';
import HistoryTools from '../Tools/HistoryTools';
import Button from '../Button';

export class ToolsFlag extends Component {
    render() {
        return (
            <YouTubeContext.Consumer>
                {(context) => (
                    <div className="tools">
                        <div>
                            { context.state.canFlag ? <FlagTools {...context} /> : <HistoryTools /> }
                        </div>
                        <div className="flex-me flex-justify-between mgi--top-10 flex-align">
                            <Pagination pages={context.state.pagination} />
                            <div>
                                {
                                  context.state.canFlag &&
                                  <Button
                                    className={context.state.videosDisplayed.filter(x => x.selected).length ? 'active' : ''} blue
                                    onClick={() => context.selectAll('videosDisplayed')}>Select all</Button>
                                }
                                {
                                (context.state.canFlag && context.state.onToFlag) &&
                                  <Button
                                    className="mgi--left-10"
                                    blue
                                    disabled={context.state.videosDisplayed.filter(x => x.selected).length === 0}
                                    onClick={() => context.removeVideosToFlag()}>Remove from the list</Button>
                                }
                            </div>
                        </div>
                    </div>
                )}
            </YouTubeContext.Consumer>
        )
    }
}

export default ToolsFlag
