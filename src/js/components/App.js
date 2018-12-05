import React, { Component } from 'react'
import { Sidebar } from '@components/Sidebar/Sidebar';
import { YouTubeContext } from '@stores/YouTubeContext';
import FlagButton from '@components/FlagButton/FlagButton';
import AppRouter from '../routes/router';
import { withRouter } from "react-router";
import { fetchHistory, fetchSearch } from '@shared/api/Deputy';
import { getAllUrlParams, wait } from '@utils/index';
import Navbar from './Navbar/Navbar';

class App extends Component {

  constructor() {
    super()
    this.state = {
      isFetching: false
    }
  }

  async componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      const params = getAllUrlParams()
      if (this.props.location.pathname === '/flagging_history') {
        return this.props.context.getVideos('history')
      } else if (params.search_query) {
        return this.props.context.getVideos('search')
      }
    }
  }

  render() {
      return (
          window.location.pathname !== '/watch'
          ?
            <React.Fragment>
              <Navbar />
              <main id="TF-main">
                <Sidebar location={this.props.location} />
                <div className="main-container">
                  <AppRouter />
                </div>
              </main>
            </React.Fragment>
          :
          <FlagButton
            videoWatched={this.props.context.state.videoWatched}
            videosToFlag={this.props.context.state.videosToFlag}
            setContextState={this.props.context.setState}
          />
      )
  }
}

export default withRouter(App)