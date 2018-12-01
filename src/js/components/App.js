import React, { Component } from 'react'
import { Sidebar } from './Sidebar/Sidebar';
import { ToolsFlag } from './ToolsFlag/ToolsFlag';
import { VideosList } from './VideosList/VideosList';
import { FormFlagging } from './FormFlagging/FormFlagging';
import { urlsAvailable } from '../config/config';
import { YouTubeContext } from '../content_script';
import TemplatesContainer from '../containers/TemplatesContainer';
import SearchesContainer from '../containers/SearchesContainer';
import AnalyticsContainer from '../containers/AnalyticsContainer';
import FlagButton from './FlagButton/FlagButton';
import Popup from './Popup/Popup';
import Logs from './Logs/Logs';

class App extends Component {
    render() {
        return (
            window.location.pathname !== '/watch'
            ?
            <YouTubeContext.Consumer>
                {(context) => (
								<React.Fragment>
                  <Sidebar />
                  <div className="main-container">
                    {
                    context.state.pathname === urlsAvailable[0]
                    ?
                        <div className="full-heigth">
                            <ToolsFlag />
                            <VideosList videos={context.state.videosDisplayed} />
                        </div>
                    : context.state.pathname === urlsAvailable[1] ?
                        <FormFlagging videos={context.state.videosDisplayed} context={context} />
                    : context.state.pathname === urlsAvailable[2] ?
                        <div className="full-heigth main-body">
                            <AnalyticsContainer />
                        </div>
                    : context.state.pathname === urlsAvailable[3] ?
                        <div className="full-heigth main-body">
                            <TemplatesContainer />
                        </div>
                    : context.state.pathname === urlsAvailable[4] ?
                        <div className="full-heigth main-body">
                            <SearchesContainer />
                        </div>
                    : context.state.pathname === urlsAvailable[5] ?
                        <FormFlagging videos={context.state.videosDisplayed} context={context} />
                    : <div className="main-body">This page do not exist</div>
                    }
                	</div>
									<Popup
										isOpen={context.state.openModal.isOpen && context.state.openModal.type}
										onClosed={() => context.openModal(context.state.openModal.type, false)}
									>
										{ context.state.openModal.type === 'logs' &&
                      <Logs
                        onClosed={() => context.openModal(context.state.openModal.type, false)}
                      />
										}
									</Popup>
								</React.Fragment>
							)}
						</YouTubeContext.Consumer>
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

export default App