import React, { useContext, useMemo } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { DomContext } from '@deputy/store/DomContext'
import { DefaultContext } from '@deputy/store/DefaultContext'
import './analytics.scoped.scss'

export const colors = [
  'rgb(147, 52, 230)',
  'rgb(24, 128, 56)',
  'rgb(192, 202, 51)',
  'rgb(128, 134, 138)',
  'rgb(252, 201, 52)',
  'rgb(244, 81, 30)',
  'rgb(242, 153, 0)',
  'rgb(216, 27, 96)',
  'rgb(179, 157, 219)',
  'rgb(63, 81, 181)',
  'rgb(3, 155, 229)',
  'rgb(121, 85, 72)',
  'rgb(51, 182, 121)'
]

const getTemplatesData = templates => ({
  labels: templates.map(template => template.title),
  datasets: [
    {
      data: templates.map(template => template.nbVideosFlagged + template.nbChannelsFlagged),
      backgroundColor: colors
    }
  ]
})

const getSearchesData = searches => ({
  labels: searches.map(template => template.value),
  datasets: [
    {
      data: searches.map(template => template.nbVideosFlagged + template.nbChannelsFlagged),
      backgroundColor: colors
    }
  ]
})

function Analytics() {
  const [{ analytics }] = useContext(DomContext)
  const [{ templates, searches }] = useContext(DefaultContext)

  const templatesData = useMemo(() => getTemplatesData(templates), [templates])
  const searchesData = useMemo(() => getSearchesData(searches), [searches])

  return (
    <div className="analytics">
      <div className="header-analytics">
        <h1 className="title-box">Analytics</h1>
      </div>
      <div className="container-box">
        <div className="container-summary box-material">
          <h2 className="title-box">Summary</h2>
          <table className="table-material">
            <tbody>
              <tr>
                <td>Videos actionned</td>
                <td>{analytics.nbActioned}</td>
              </tr>
              <tr>
                <td>Videos not actionned</td>
                <td>{analytics.nbFlagged - analytics.nbActioned}</td>
              </tr>
              <tr>
                <th>Total</th>
                <th className="total-allFlagged">{analytics.nbFlagged}</th>
              </tr>
            </tbody>
          </table>
          <p className="success-rate">
            Your success rate is {((analytics.nbActioned / analytics.nbFlagged) * 100).toFixed(2)}% !
          </p>
        </div>
        <div className="templates-searches">
          <div className="box-material">
            <h2 className="title-box">Videos/Channels flagged by templates</h2>
            {templates.length === 0 && <p className="note">No template yet</p>}
            <Doughnut data={templatesData} />
          </div>
          <div className="box-material">
            <h2 className="title-box">Videos/Channels flagged by custom searches</h2>
            {searches.length === 0 && <p className="note">No custom search yet</p>}
            <Doughnut data={searchesData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
