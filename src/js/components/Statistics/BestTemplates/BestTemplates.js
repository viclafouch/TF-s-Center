import React from 'react'
import { Pie } from 'react-chartjs-2'

const BestTemplates = ({ context }) => {
  function compare(a, b) {
    if (a.nb_flagged < b.nb_flagged) return -1
    if (a.nb_flagged > b.nb_flagged) return 1
    return 0
  }

  const templates = context.state.templates
    .filter((elem) => elem.nb_flagged)
    .sort(compare)
    .reverse()
    .slice(0, 5)

  const default_colors = [
    '#3366CC',
    '#DC3912',
    '#FF9900',
    '#109618',
    '#990099',
    '#3B3EAC',
    '#0099C6',
    '#DD4477',
    '#66AA00',
    '#B82E2E',
    '#316395',
    '#994499',
    '#22AA99',
    '#AAAA11',
    '#6633CC',
    '#E67300',
    '#8B0707',
    '#329262',
    '#5574A6',
    '#3B3EAC',
  ]

  const data = {
    labels: templates.map((el) => el.title),
    datasets: [
      {
        data: templates.map((el) => el.nb_flagged),
        backgroundColor: templates.map((el, index) => default_colors[index]),
        hoverBackgroundColor: templates.map(
          (el, index) => default_colors[index]
        ),
      },
    ],
  }

  const options = {
    legend: {
      display: true,
      position: 'bottom',
    },
  }

  return (
    <div className="chart-container">
      <Pie data={data} options={options} />
      {templates.length === 0 && <p>No data provided</p>}
    </div>
  )
}

export default BestTemplates
