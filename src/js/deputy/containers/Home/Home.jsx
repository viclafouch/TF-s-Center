import React, { useContext, useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Line, Doughnut } from 'react-chartjs-2'
import { Link } from 'react-router-dom'
import { format, formatDistance } from 'date-fns'
import { faPaste } from '@fortawesome/free-solid-svg-icons/faPaste'
import { faSearchengin } from '@fortawesome/free-brands-svg-icons/faSearchengin'
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'
import { faBullseye } from '@fortawesome/free-solid-svg-icons/faBullseye'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { faFlag } from '@fortawesome/free-solid-svg-icons/faFlag'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt'
import { DefaultContext } from '@deputy/store/DefaultContext'
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

const bestTemplatesData = templates => {
  const bests = [...templates]
    .sort((a, b) => a.nbVideosFlagged + a.nbChannelsFlagged - (b.nbVideosFlagged + b.nbChannelsFlagged))
    .slice(0, 5)
  return {
    labels: bests.map(t => t.title),
    datasets: [
      {
        data: bests.map(t => t.nbVideosFlagged + t.nbChannelsFlagged),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#E7E9ED', '#4BC0C0']
      }
    ]
  }
}

function Home() {
  const [{ templates, searches, lastReportedEntities, lastSearches, targets }] = useContext(DefaultContext)
  const [{ analytics }] = useContext(DomContext)
  const lastReported = useMemo(() => lastSevenData(lastReportedEntities), [lastReportedEntities])
  const bestTemplates = useMemo(() => bestTemplatesData(templates), [templates])
  const lastReportedOptions = useMemo(
    () => ({
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              stepSize: 150,
              min: 0,
              fontColor: '#949494',
              max: 100
            }
          }
        ],
        xAxes: [
          {
            ticks: {
              fontColor: '#949494'
            }
          }
        ]
      },
      legend: {
        labels: {
          fontColor: '#949494'
        }
      }
    }),
    []
  )

  const bestTemplatesOptions = useMemo(
    () => ({
      legend: {
        labels: {
          fontColor: '#949494'
        }
      }
    }),
    []
  )

  const lastSearchesParams = useMemo(
    () =>
      lastSearches.map(l => ({
        ...l,
        value: new URLSearchParams(l.value)
      })),
    [lastSearches]
  )

  return (
    <div className="home">
      <div className="header-home">
        <h1 className="title-box">Dashboard</h1>
      </div>
      <div className="container-box">
        <div className="full-box">
          <div className="box-material">
            <p className="summary-text">
              If you would like to contact the Trusted Flagger team to report an urgent case, provide additional context about
              flagged content, or ask a question, please reach out to us using this{' '}
              <a href="https://support.google.com/youtube/contact/trustedflagging?hl=en">form</a> . If you do not have access to
              the form, reach out to <a href="mailto:tf-training@google.com">tf-training@google.com</a>.
            </p>
          </div>
        </div>
        <div className="big-box">
          <div className="box-material">
            <h4 className="title-box">Last content reported with TF Center</h4>
            <div className="chart-container">
              <Line data={lastReported} options={lastReportedOptions} />
            </div>
          </div>
        </div>
        <div className="mini-box summary-numbers">
          <div className="box-material box-summary-numbers">
            <div className="icon-box icon-mini-box">
              <FontAwesomeIcon icon={faBullseye} size="2x" fixedWidth />
            </div>
            <h4 className="title-box">
              <span className="number-box">{targets.length}</span> {targets.length > 1 ? 'Targets' : 'Target'}
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
              <span className="number-box">{analytics.nbActioned.toLocaleString()}</span> Videos removed
            </h4>
          </div>
        </div>
        <div className="big-box box-material last-searches">
          <h4 className="title-box">Last searches</h4>
          <table className="table-material">
            <thead>
              <tr>
                <th>Search</th>
                <th>Filters</th>
                <th>Exclude previously flagged videos</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {lastSearchesParams.map((lastSearch, index) => (
                <tr key={index}>
                  <td>{lastSearch.value.get('search_query')}</td>
                  <td className="td-filters">{lastSearch.value.get('filters') || 'Anytime'}</td>
                  <td>
                    {lastSearch.value.get('exclude_flagged_videos') === 'true' ? (
                      <FontAwesomeIcon icon={faCheck} size="1x" fixedWidth />
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{formatDistance(new Date(lastSearch.createdAt), new Date(), { addSuffix: true })}</td>
                  <td>
                    <Link
                      to={{
                        pathname: '/deputy',
                        search: `?${lastSearch.value.toString()}`
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
        <div className="mini-box templates-support">
          <div className="box-material">
            <h4 className="title-box">Best templates</h4>
            <div className="chart-container">
              {templates.length > 0 && <Doughnut data={bestTemplates} options={bestTemplatesOptions} />}
              {templates.length === 0 && <p className="note">No template yet</p>}
            </div>
          </div>
          <div className="box-material overview-program">
            <a target="_blank" rel="noreferrer" href="https://support.google.com/youtube/contact/trustedflagging">
              <p className="title-box">Trusted Flagger Escalations</p>
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </div>
          <div className="box-material overview-version">
            <a target="_blank" rel="noreferrer" href="https://github.com/viclafouch/TFs-Center">
              <p className="title-box">TF Center V1.5</p>
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
