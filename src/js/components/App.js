import React, { Component } from 'react'
import { Sidebar } from '@components/Sidebar/Sidebar';
import { YouTubeContext } from '@stores/YouTubeContext';
import FlagButton from '@components/FlagButton/FlagButton';
import AppRouter from '../routes/router';
import { withRouter } from "react-router";
import { fetchHistory } from '@shared/api/Deputy';
import { getAllUrlParams } from '@utils/index';

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
        await this.props.context.setState('isLoading', true)
        try {
          const videos = await fetchHistory(params)
          await this.props.context.setMultipleState({
            ...videos,
            videosDisplayed: videos.videos
          })
        } catch (error) {
          console.log(error)
        } finally {
          this.props.context.setState('isLoading', false)
        }
      }
    }
  }

  render() {
      return (
          window.location.pathname !== '/watch'
          ?
            <React.Fragment>
                <Sidebar location={this.props.location} />
                <div className="main-container">
                  <AppRouter />
                </div>
            </React.Fragment>
          :
          <YouTubeContext.Consumer>
            {(context) => (
              <FlagButton
                videoWatched={context.state.videoWatched}
                videosToFlag={context.state.videosToFlag}
                setContextState={context.setState}
                removeVideo={context.setState}
              />
            )}
          </YouTubeContext.Consumer>
      )
  }
}

export default withRouter(App)