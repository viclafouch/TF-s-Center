import React, { Component } from 'react'
import { YouTubeContext } from '../../main';

export class FlagButton extends Component {

  constructor() {
    super();
    this.onFlag = this.onFlag.bind(this)
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props);
  }


  onFlag(e) {
    e.preventDefault();
    const { videoWatched, videosToFlag } = this.props;

    if (videosToFlag.find(x => x.id === videoWatched.id)) return;

    videosToFlag.push(videoWatched)

    this.props.setContextState('videosToFlag', videosToFlag)
  }

  render() {
    return (
      <a href="/" onClick={this.onFlag}>
        <span>Flag</span>
      </a>
    )
  }
}

export default FlagButton
