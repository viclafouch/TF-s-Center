import React, { Component } from 'react'
import { Sidebar } from '@components/Sidebar/Sidebar';
import { ToolsFlag } from '@components/ToolsFlag/ToolsFlag';
import { VideosList } from '@components/VideosList/VideosList';
import { FormFlagging } from '@components/FormFlagging/FormFlagging';
import { urlsAvailable } from '../config/config';
import { YouTubeContext } from '@stores/YouTubeContext';
import TemplatesContainer from '@containers/TemplatesContainer';
import SearchesContainer from '@containers/SearchesContainer';
import AnalyticsContainer from '@containers/AnalyticsContainer';
import FlagButton from '@components/FlagButton/FlagButton';
import Popup from '@components/Popup/Popup';
import Logs from '@components/Logs/Logs';
import { BrowserRouter } from 'react-router-dom'
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
        try {
          const videos = await fetchHistory(params)
          await this.props.context.setMultipleState({
            ...videos,
            videosDisplayed: videos.videos
          })
        } catch (error) {
          console.log(error)
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