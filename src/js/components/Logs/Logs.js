import React, { Component } from 'react'
import { Release } from '../../shared/models/Release.class';
import Button from '../Button';
import { openInNewTab, clearStorages } from '../../utils/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons/faExternalLinkAlt'

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
      let releaseds = await this.fetchReleased()
      this.setState({ releaseds, error: false })
      return;
    } catch (error) {
      this.setState({
        error: true
      });
    }
  }

  componentDidMount() {
    this.getReleased();
  }

  render() {
    return (
      <div className="logs-container">
        {
          this.state.error
          ?
          <div>An error occurred</div>
          :
          <React.Fragment>
            <div className="pdi--20">
              <div className="logs-header flex-me flex-justify-between">
                <h2 className="logs-title pdi--bottom-6">Last logs</h2>
                <Button blue onClick={() => clearStorages()}>Reset storage</Button>
              </div>
              <div className="logs-list">
                {
                  this.state.releaseds.slice(0, 5).map((release, index) => (
                    <article key={release.id} className="log-item">
                      <h4 className="log-item-title">{release.name} <a href={release.url} target="_blank">(See)</a> {index === 0 && "(Latest)"}</h4>
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
