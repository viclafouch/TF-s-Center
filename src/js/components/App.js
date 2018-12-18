import React, { Component } from 'react'
import { Sidebar } from '@components/Sidebar/Sidebar'
import FlagButton from '@components/FlagButton/FlagButton'
import AppRouter, { Loader } from '../routes/router'
import { withRouter } from "react-router"
import Navbar from './Navbar/Navbar'
import NotificationSystem from 'react-notification-system'
import ERRORS from '../../../errors.json'
import Popup from './Popup/Popup'
import Logs from './Logs/Logs'
import { onDeputyLocation } from '@utils/index'

class App extends Component {

  constructor() {
    super()
    this.notificationSystem = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.notification.id !== this.props.notification.id && this.props.notification.id) {
      this.addNotification(this.props.notification.params)
      const url = this.props.location.pathname + this.props.location.search
      if (this.props.notification.type === 'flaggedVideos' && this.props.notification.params.level === 'success') this.props.history.push(url)
    }
  }

  addNotification({ level = 'success', message} = {}) {
    if (level === 'error') message = !Object.values(ERRORS).find(x => x.message === message) ? 'An error occurred !' : message
    const notification = this.notificationSystem.current;
    notification.addNotification({
      message,
      level,
      position: 'br',
      autoDismiss: 5
    });
  };

  render() {
    const notificationStyle = {
      NotificationItem: {
        success: {
          color: '#FFFFFF',
          background: 'green'
        },
        error: {
          color: '#FFFFFF',
          background: 'red'
        }
      }
    }
    return (
      onDeputyLocation(this.props.location)
      ?
        <React.Fragment>
          <Navbar />
          <main id="TF-main">
            <Sidebar location={this.props.location} />
            <div className="main-container">
              { this.props.context.state.isFetchingSlow && <Loader /> }
              <AppRouter context={this.props.context} />
              <NotificationSystem ref={this.notificationSystem} style={notificationStyle} />
            </div>
          </main>
          <Popup type="logs">
            <Logs />
          </Popup>
        </React.Fragment>
      :
      <FlagButton
        watchedVideo={this.props.context.state.watchedVideo}
        videosToFlag={this.props.context.state.videosToFlag}
        setContextState={this.props.context.setState}
      />
    )
  }
}

export default withRouter(App)