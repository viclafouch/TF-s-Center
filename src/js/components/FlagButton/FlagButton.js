import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import svgIcon from '../../../img/sheriff.js'

export class FlagButton extends Component {

  constructor() {
    super();
    this.onFlag = this.onFlag.bind(this)
  };

  componentDidMount() {
    document.getElementById('svgSheriff').innerHTML = svgIcon
  }

  onFlag(e) {
    e.preventDefault();
    const { videoWatched, videosToFlag } = this.props;
    const existingIndex = videosToFlag.findIndex(x => x.id === videoWatched.id)
    if (existingIndex === -1) {
      videosToFlag.push(videoWatched)
    } else {
      videosToFlag.splice(existingIndex, 1);
    }
    this.props.setContextState('videosToFlag', videosToFlag)
  }

  render() {

    const { videoWatched, videosToFlag } = this.props;

    return (
      <button onClick={this.onFlag} className={videosToFlag.find(x => x.id === videoWatched.id) ? 'active' : ''}>
        <span>Add to targets</span>
        <span className="span-icon mgi--left-5">
          <FontAwesomeIcon icon={faCheck} size="1x" fixedWidth />
        </span>
        <i id="svgSheriff" className="mgi--left-5"></i>
      </button>
    )
  }
}

export default FlagButton
