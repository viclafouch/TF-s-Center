import React, { useContext } from 'react'
import { DefaultContext } from '@deputy/store/DefaultContext'
import './analytics.scoped.scss'

function Analytics() {
  const [{ analytics }] = useContext(DefaultContext)

  console.log(analytics)

  return (
    <div className="analytics">
      <div className="container-tables">
        <div className="container-table-resum box-material">
          <h1 className="resum-title">Analytics</h1>
          <table className="resum-table table-material">
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
      </div>
    </div>
  )
}

export default Analytics
