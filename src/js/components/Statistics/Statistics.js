import React, { Component } from 'react'
import { YouTubeContext } from '../../main';
import LastSevenDays from './LastSevenDays/LastSevenDays';

export class Statistics extends Component {
    render() {
        return (
            <div className="pdi--10">
                <YouTubeContext.Consumer>
                    {(context) => (
                        <div>
                            <h1 className="mgi--bottom-10">Metrics</h1>
                            <p className="mgi--bottom-10">Videos Flagged All Time : {context.state.statistics.allFlagged}</p>
                            <p className="mgi--bottom-10">Videos Actioned All Time : {context.state.statistics.allActioned} ({((context.state.statistics.allActioned / context.state.statistics.allFlagged) * 100).toFixed(2)}%)</p>
                        </div>
                    )}
                </YouTubeContext.Consumer>
                <div className="mgi--bottom-10">
                    <YouTubeContext.Consumer>
                        {(context) => (
                            <LastSevenDays context={context} />
                        )}
                    </YouTubeContext.Consumer>
                </div>
            </div>
        )
    }
}

export default Statistics
