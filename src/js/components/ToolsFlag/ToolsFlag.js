import React, { Component } from 'react'
import { YouTubeContext } from '@stores/YouTubeContext'
import Pagination from '../Tools/Pagination/Pagination'
import FlagTools from '../Tools/FlagTools'
import HistoryTools from '../Tools/HistoryTools'
import Button from '../Button'

export class ToolsFlag extends Component {
  render() {
    return (
      <YouTubeContext.Consumer>
        {context => (
          <div className="tools">
            <div>
              {this.props.canFlag ? (
                <FlagTools {...context} canFlag={this.props.canFlag} />
              ) : (
                <HistoryTools canFlag={this.props.canFlag} />
              )}
            </div>
            <div className="flex-me flex-justify-between mgi--top-10 flex-align">
              <Pagination pages={context.state.pagination} />
              <div>
                {this.props.canFlag && (
                  <Button
                    className={
                      context.state.videosDisplayed.filter(x => x.selected)
                        .length === context.state.videosDisplayed.length &&
                      context.state.videosDisplayed.length !== 0
                        ? 'active'
                        : ''
                    }
                    blue
                    disabled={context.state.videosDisplayed.length === 0}
                    onClick={() => context.selectAll('videosDisplayed')}
                  >
                    Select all
                  </Button>
                )}
                {this.props.canFlag && context.state.onToFlag && (
                  <Button
                    className="mgi--left-10"
                    blue
                    disabled={
                      context.state.videosDisplayed.filter(x => x.selected)
                        .length === 0
                    }
                    onClick={() => context.removeVideosToFlag()}
                  >
                    Remove from the list
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </YouTubeContext.Consumer>
    )
  }
}

export default ToolsFlag
