import React from 'react'
import './analytics.scoped.scss'

function Analytics() {
  return (
    <div className="analytics">
      <div className="container-tables">
        <div className="container-table-resum box-material">
          <h1 className="pdi--15">Analytics</h1>
          <table className="table-material">
            <tbody>
              <tr>
                <td>Videos actionned</td>
                <td>123</td>
              </tr>
              <tr>
                <td>Videos not actionned</td>
                <td>19</td>
              </tr>
              <tr>
                <th>Total</th>
                <th className="total-allFlagged">200</th>
              </tr>
            </tbody>
          </table>
          <p>Your success rate is 77% !</p>
        </div>
      </div>
    </div>
  )
}

export default Analytics
