import React, { Component } from 'react'
import { Sidebar } from './Sidebar/Sidebar';
import { ToolsFlag } from './ToolsFlag/ToolsFlag';
import { VideosList } from './VideosList/VideosList';
import { FormFlagging } from './FormFlagging/FormFlagging';
import { urlsAvailable } from '../config';
import { YouTubeContext } from '../main';
import { Statistics } from './Statistics/Statistics';
import TemplatesContainer from '../containers/TemplatesContainer';
import SearchesContainer from '../containers/SearchesContainer';

class App extends Component {

    render() {
        return (
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
                                <div className="full-heigth">
                                    <Statistics />
                                </div>
                            : context.state.pathname === urlsAvailable[3] ?
                                <div className="full-heigth">
                                    <TemplatesContainer />
                                </div>
                            : context.state.pathname === urlsAvailable[4] ?
                                <div className="full-heigth">
                                    <SearchesContainer />
                                </div>
                            : <div>This page do not exist</div>
                        )}
                    </YouTubeContext.Consumer>
                </div>
            </React.Fragment>
        )
    }
}

export default App