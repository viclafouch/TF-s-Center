import React, { useContext, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Line } from 'react-chartjs-2'
import { Link } from 'react-router-dom'
import { faPaste } from '@fortawesome/free-solid-svg-icons/faPaste'
import { faSearchengin } from '@fortawesome/free-brands-svg-icons/faSearchengin'
import { faBullseye } from '@fortawesome/free-solid-svg-icons/faBullseye'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faFlag } from '@fortawesome/free-solid-svg-icons/faFlag'
import { DefaultContext } from '@deputy/store/DefaultContext'
import { format } from 'date-fns'
import Button from '@deputy/components/Button/Button'
import { DomContext } from '@deputy/store/DomContext'
import './home.scoped.scss'

const lastSevenData = lastReportedEntities => ({
  labels: lastReportedEntities.map(entity => format(new Date(entity.date), 'MM/dd/yyyy')),
  datasets: [
    {
      label: 'Videos',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'transparent',
      borderColor: '#FF6384',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: '#FF6384',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: '#FF6384',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: lastReportedEntities.map(entity => entity.videos)
    },
    {
      label: 'Channels',
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
      data: lastReportedEntities.map(entity => entity.channels)
    }
  ]
})

function Home() {
  const [{ templates, searches, lastReportedEntities, lastSearches }] = useContext(DefaultContext)
  const [{ analytics }] = useContext(DomContext)
  const lastReportedData = useMemo(() => lastSevenData(lastReportedEntities), [lastReportedEntities])
  const lastReportedOptions = useMemo(
    () => ({
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              stepSize: 150,
              min: 0,
              max: 100
            }
          }
        ]
      }
    }),
    []
  )

  const lastSearchesParams = useMemo(() => lastSearches.map(l => new URLSearchParams(l)), [lastSearches])

  return (
    <div className="home">
      <div className="header-home">
        <h1 className="title-box">Dashboard</h1>
      </div>
      <div className="container-box">
        <div className="big-box">
          <div className="box-material box-summary-numbers">
            <h4 className="title-box">Last content reported with TF Center</h4>
            <div className="chart-container">
              <Line data={lastReportedData} options={lastReportedOptions} />
            </div>
          </div>
        </div>
        <div className="mini-box summary-numbers">
          <div className="box-material box-summary-numbers">
            <div className="icon-box icon-mini-box">
              <FontAwesomeIcon icon={faBullseye} size="2x" fixedWidth />
            </div>
            <h4 className="title-box">
              <span className="number-box">67</span> Targets
            </h4>
          </div>
          <div className="box-material box-summary-numbers">
            <div className="icon-box icon-mini-box">
              <FontAwesomeIcon icon={faPaste} size="2x" fixedWidth />
            </div>
            <h4 className="title-box">
              <span className="number-box">{templates.length}</span> {templates.length > 1 ? 'Templates' : 'Template'}
            </h4>
          </div>
          <div className="box-material box-summary-numbers">
            <div className="icon-box icon-mini-box">
              <FontAwesomeIcon icon={faSearchengin} size="2x" fixedWidth />
            </div>
            <h4 className="title-box">
              <span className="number-box">{searches.length}</span> Custom {searches.length > 1 ? 'searches' : 'search'}
            </h4>
          </div>
          <div className="box-material box-summary-numbers">
            <div className="icon-box icon-mini-box">
              <FontAwesomeIcon icon={faFlag} size="2x" fixedWidth />
            </div>
            <h4 className="title-box">
              <span className="number-box">{analytics.nbActioned}</span> Videos removed
            </h4>
          </div>
        </div>
        <div className="full-box box-material last-searches">
          <h4 className="title-box">Last searches</h4>
          <table className="table-material">
            <thead>
              <tr>
                <th>Search</th>
                <th>Filters</th>
                <th>Excluded</th>
                <th>Search ID</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {lastSearchesParams.map((lastSearch, index) => (
                <tr key={index}>
                  <td>{lastSearch.get('search_query')}</td>
                  <td>{lastSearch.get('filters')}</td>
                  <td>
                    {['true', null].includes(lastSearch.get('exclude_flagged_videos')) ? (
                      <FontAwesomeIcon icon={faCheck} size="1x" fixedWidth />
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{lastSearch.get('search_id')}</td>
                  <td>
                    <Link
                      to={{
                        pathname: '/deputy',
                        search: `?${lastSearch.toString()}`
                      }}
                    >
                      <Button color="blue" tabIndex="-1">
                        Go
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Home
