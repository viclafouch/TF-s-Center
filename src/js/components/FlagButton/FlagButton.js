import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { getStorages } from '@stores/BrowserStorage.js'
import svgIcon from '../../../img/sheriff.js'

export class FlagButton extends Component {
  constructor() {
    super()
    this.sheriff = React.createRef()
    this.onFlag = this.onFlag.bind(this)
  }

  componentDidMount() {
    return (this.sheriff.current.innerHTML = svgIcon)
  }

  async onFlag(e) {
    e.preventDefault()
    const { watchedVideo } = this.props
    const { videosToFlag } = await getStorages('local')
    const existingIndex = videosToFlag.findIndex(x => x.id === watchedVideo.id)
    if (existingIndex === -1) videosToFlag.push(watchedVideo)
    else videosToFlag.splice(existingIndex, 1)
    return this.props.setContextState({ videosToFlag })
  }

  render() {
    const { watchedVideo, videosToFlag } = this.props

    return (
      <button
        onClick={this.onFlag}
        className={
          videosToFlag.find(x => x.id === watchedVideo.id) ? 'active' : ''
        }
      >
        <span className="span-icon">
          <FontAwesomeIcon icon={faCheck} size="1x" fixedWidth />
        </span>
        <i id="svgSheriff" ref={this.sheriff} />
        <span>Add</span>
      </button>
    )
  }
}

export default FlagButton
