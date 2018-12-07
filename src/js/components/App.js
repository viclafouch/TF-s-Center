import React, { Component } from 'react'
import { Sidebar } from '@components/Sidebar/Sidebar';
import FlagButton from '@components/FlagButton/FlagButton';
import AppRouter, { Loader } from '../routes/router';
import { withRouter } from "react-router";
import Navbar from './Navbar/Navbar';

class App extends Component {
  render() {
      return (
          window.location.pathname !== '/watch'
          ?
            <React.Fragment>
              <Navbar />
              <main id="TF-main">
                <Sidebar location={this.props.location} />
                <div className="main-container">
                  { this.props.context.state.isFetchingSlow && <Loader /> }
                  <AppRouter context={this.props.context} />
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