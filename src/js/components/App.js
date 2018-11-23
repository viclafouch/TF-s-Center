import React, { Component } from 'react'
import { Sidebar } from './Sidebar/Sidebar';
import { ToolsFlag } from './ToolsFlag/ToolsFlag';
import { VideosList } from './VideosList/VideosList';
import { FormFlagging } from './FormFlagging/FormFlagging';
import { urlsAvailable } from '../config';
import { YouTubeContext } from '../main';
import TemplatesContainer from '../containers/TemplatesContainer';
import SearchesContainer from '../containers/SearchesContainer';
import AnalyticsContainer from '../containers/AnalyticsContainer';
import FlagButton from './FlagButton/FlagButton';

class App extends Component {
    render() {
        return (
            window.location.pathname !== '/watch'
            ?
            <React.Fragment>
                <Sidebar />
                <div className="main-container">
                    <YouTubeContext.Consumer>
                        {(context) => (
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
                            : <div class="main-body">This page do not exist</div>
                        )}
                    </YouTubeContext.Consumer>
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

export default App