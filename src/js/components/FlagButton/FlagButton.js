import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import svgIcon from '../../../img/sheriff.js'

export class FlagButton extends Component {

  constructor() {
    super();
    this.sheriff = React.createRef();
    this.onFlag = this.onFlag.bind(this)
  };

  componentDidMount() {
    return this.sheriff.current.innerHTML = svgIcon
  }

  onFlag(e) {
    e.preventDefault();
    const { watchedVideo, videosToFlag } = this.props;
    const existingIndex = videosToFlag.findIndex(x => x.id === watchedVideo.id)
    if (existingIndex === -1) videosToFlag.push(watchedVideo)
    else videosToFlag.splice(existingIndex, 1)
    return this.props.setContextState({ videosToFlag })
  }

  render() {

    const { watchedVideo, videosToFlag } = this.props;

    return (
      <button onClick={this.onFlag} className={videosToFlag.find(x => x.id === watchedVideo.id) ? 'active' : ''}>
        <span>Add to targets</span>
        <span className="span-icon mgi--left-5">
          <FontAwesomeIcon icon={faCheck} size="1x" fixedWidth />
        </span>
        <i id="svgSheriff" ref={this.sheriff} className="mgi--left-5"></i>
      </button>
    )
  }
}

export default FlagButton
