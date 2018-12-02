import React, { Component } from 'react'
import { Release } from '../../shared/models/Release.class';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt'
import svgIcon from '../../../img/sheriff'
import { getDateFormat } from "../../utils/date";
import { clearStorages, openInNewTab } from '../../utils/browser';

export class Logs extends Component {
  constructor() {
    super();

    this.state = {
      releaseds: [],
      error: false
    }
  }

  fetchReleased() {
    return fetch('https://api.github.com/repos/viclafouch/TFs-Center/releases')
      .then(e => e.json())
      .then(json => json.map(e => new Release(e)))
      .catch(error => {
        throw error
      })
  }

  async getReleased() {
    try {
      const releaseds = await this.fetchReleased()
      this.setState({ releaseds, error: false })
      return;
    } catch (error) {
      this.setState({
        error: true
      });
    }
  }

  componentDidMount() {
    document.getElementById('svgSheriff').innerHTML = svgIcon
    this.getReleased();
  }

  render() {
    return (
      <div className="logs-container">
        {
          this.state.error
          ?
          <div className="pdi--20 flex-me flex-align flex-justify-center"><span>An error occurred.</span></div>
          :
          <React.Fragment>
            <div className="pdi--20">
              <div className="logs-header flex-me flex-justify-between">
                <h2 className="logs-title pdi--bottom-6">Last logs</h2>
                <div className="flex-me">
                  { process.env.NODE_ENV === 'development' && <Button className="mgi--left-10" blue onClick={() => clearStorages()}>Reset storage</Button> }
                    <a href={process.env.homepage_url} target="_blank">
                      <Button className="mgi--left-10 flex-me flex-align"><span>Rate this extension</span> <i id="svgSheriff" className="mgi--left-5"></i></Button>
                    </a>
                </div>
              </div>
              <div className="logs-list scrollBarOnHover">
                {
                  this.state.releaseds.slice(0, 5).map((release, index) => (
                    <article key={release.id} className="log-item">
                      <div>
                        <h4 className="log-item-title">{release.name}</h4>
                        {' '}
                        <a href={release.url} target="_blank">(See)</a>
                        {' '}
                        <span className="log-date">{getDateFormat(release.created_at)}</span>
                        {' '}
                        {index === 0 && <b>(Latest)</b>}
                      </div>
                      <ul>
                        {release.body.map((item, index) => <li key={index}>{item}</li>)}
                      </ul>
                    </article>
                  ))
                }
              </div>
            </div>
            <div className="buttons">
              <div className="mgi--left-10">
                <Button type="button" white onClick={() => this.props.onClosed()}>Close</Button>
              </div>
              <div className="mgi--left-10">
                <Button type="submit" blue onClick={() => openInNewTab('https://github.com/viclafouch/TFs-Center/releases', true)}>See all <FontAwesomeIcon icon={faExternalLinkAlt} size="1x" fixedWidth /></Button>
              </div>
            </div>
          </React.Fragment>
          }
      </div>
    )
  }
}

export default Logs
