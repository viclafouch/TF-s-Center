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
                            {
                                context.state.canFlag &&
                                <Button className={context.state.videosDisplayed.filter(x => x.selected).length === context.state.videosDisplayed.length ? 'active' : ''} blue onClick={() => context.selectAll('videosDisplayed')}>Select all</Button>
                            }
                        </div>
                    </div>
                )}
            </YouTubeContext.Consumer>
        )
    }
}

export default ToolsFlag
