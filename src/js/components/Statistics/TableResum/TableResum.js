import React from 'react'
import { YouTubeContext } from '@stores/YouTubeContext';

const TableResum = () => {
    return (
        <YouTubeContext.Consumer>
            {(context) => (
                <div className="container-table-resum box-material">
                    <h1 className="pdi--15">Analytics</h1>
                    <table className="table-material">
                        <tbody>
                            <tr>
                                <td>Videos actionned</td>
                                <td>{context.state.statistics.allActioned}</td>
                            </tr>
                            <tr>
                                <td>Videos not actionned</td>
                                <td>{context.state.statistics.allFlagged - context.state.statistics.allActioned}</td>
                            </tr>
                            <tr>
                                <th>Total</th>
                                <th className="total-allFlagged">{context.state.statistics.allFlagged}</th>
                            </tr>
                        </tbody>
                    </table>
                    <p>Your success rate is {((context.state.statistics.allActioned / context.state.statistics.allFlagged) * 100).toFixed(2)}% !</p>
                </div>
            )}
        </YouTubeContext.Consumer>
    )
}

export default TableResum
