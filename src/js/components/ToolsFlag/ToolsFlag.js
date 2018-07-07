import React, { Component } from 'react'
import Pagination from '../Tools/Pagination/Pagination'
import { YouTubeContext } from '../../main';
import FlagTools from '../Tools/FlagTools';
import HistoryTools from '../Tools/HistoryTools';

export class ToolsFlag extends Component {
    render() {
        return (
            <YouTubeContext.Consumer>
                {(context) => (
                    <div className="tools">
                        <div>
                            { context.state.canFlag ? <FlagTools {...context} /> : <HistoryTools /> }
                        </div>
                        <div>   
                            <Pagination pages={context.state.pagination} />
                        </div>
                    </div>
                )}
            </YouTubeContext.Consumer>
        )
    }
}

export default ToolsFlag
