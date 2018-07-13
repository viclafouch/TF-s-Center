import React from 'react'
import moment from 'moment'
import { Line } from 'react-chartjs-2';

const LastSevenDays = ({context}) => {
    const data = {
        labels: context.state.flagged.reverse().map(e => e.date),
        datasets: [
            {
                label: "Videos reported with TF's Center",
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'transparent',
                borderColor: 'rgb(95, 143, 201)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgb(95, 143, 201)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgb(95, 143, 201)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: context.state.flagged.map(e => e.videos.length)
            }
        ]
    };

    return (
        <div>
            <Line data={data} height={100} />
        </div>
    )
}

export default LastSevenDays
