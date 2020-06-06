import React, { Component } from 'react'
import { YouTubeContext } from '@stores/YouTubeContext'
import { wait } from '@utils/index'

export class Popup extends Component {
  async closeModal(context) {
    await context.openModal(null, false)
    this.props.callbackOnClosed && this.props.callbackOnClosed()
    await wait(300) // Transition duration
  }

  render() {
    return (
      <YouTubeContext.Consumer>
        {context => (
          <div
            className={`popup ${
              this.props.type === context.state.modal.type &&
              context.state.modal.isOpen
                ? 'active'
                : ''
            }`}
          >
            <div className="overlay" onClick={() => this.closeModal(context)} />
            <div
              className="container"
              style={{ maxWidth: this.props.maxWidth || '' }}
            >
              {React.cloneElement(this.props.children, {
                closeModal: () => this.closeModal(context)
              })}
            </div>
          </div>
        )}
      </YouTubeContext.Consumer>
    )
  }
}

export default Popup
