import React, { Component } from 'react'
import Button from '@components/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt'
import { getDateFormat } from '@utils/date'
import { clearStorages, openInNewTab } from '@utils/browser'
import { fetchGithubReleased } from '@shared/api/Github'
import svgIcon from '../../../img/sheriff'

export class Logs extends Component {
  constructor() {
    super()

    this.sheriff = React.createRef()

    this.state = {
      releaseds: [],
      error: false,
    }
  }

  /**
   * Get all github released
   */
  async getReleased() {
    try {
      const releaseds = await fetchGithubReleased()
      return this.setState({ releaseds, error: false })
    } catch (error) {
      return this.setState({
        error: true,
      })
    }
  }

  componentDidMount() {
    this.sheriff.current.innerHTML = svgIcon
    return this.getReleased()
  }

  render() {
    return (
      <div className="logs-container">
        {this.state.error ? (
          <div className="pdi--20 flex-me flex-align flex-justify-center">
            <span>An error occurred.</span>
          </div>
        ) : (
          <>
            <div className="pdi--20">
              <div className="logs-header flex-me flex-justify-between">
                <h2 className="logs-title pdi--bottom-6">Last logs</h2>
                <div className="flex-me">
                  {process.env.NODE_ENV === 'development' && (
                    <Button
                      className="mgi--left-10"
                      blue
                      onClick={() => clearStorages()}
                    >
                      Reset storage
                    </Button>
                  )}
                  <a
                    href={process.env.homepage_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button className="mgi--left-10 flex-me flex-align">
                      <span>Rate this extension</span>{' '}
                      <i
                        id="svgSheriff"
                        ref={this.sheriff}
                        className="mgi--left-5"
                      />
                    </Button>
                  </a>
                </div>
              </div>
              <div className="logs-list scrollBarOnHover">
                {this.state.releaseds.slice(0, 5).map((release, index) => (
                  <article key={release.id} className="log-item">
                    <div>
                      <h4 className="log-item-title">{release.name}</h4>
                      <a href={release.url} target="_blank" rel="noreferrer">
                        (See)
                      </a>
                      <span className="log-date">
                        {getDateFormat(release.published_at)}
                      </span>{' '}
                      {index === 0 && <b>(Latest)</b>}
                    </div>
                    <ul>
                      {release.body.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
            <div className="buttons">
              <div className="mgi--left-10">
                <Button
                  type="button"
                  white
                  onClick={() => this.props.closeModal()}
                >
                  Close
                </Button>
              </div>
              <div className="mgi--left-10">
                <Button
                  type="submit"
                  blue
                  onClick={() =>
                    openInNewTab(
                      'https://github.com/viclafouch/TFs-Center/releases',
                      true
                    )
                  }
                >
                  See all{' '}
                  <FontAwesomeIcon
                    icon={faExternalLinkAlt}
                    size="1x"
                    fixedWidth
                  />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    )
  }
}

export default Logs
