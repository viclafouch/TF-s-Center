import React, { Component } from 'react'
import { Sidebar } from './Sidebar/Sidebar';
import { ToolsFlag } from './ToolsFlag/ToolsFlag';
import { VideosList } from './VideosList/VideosList';
import { FormFlagging } from './FormFlagging/FormFlagging';
import { urlsAvailable } from '../config';
import { YouTubeContext } from '../main';
import { Statistics } from './Statistics/Statistics';

class App extends Component {

    render() {

        // let { hideRemoved, hideReviewed } = this.state;

        // let videos = this.props.videos.filter(elem => {
        //     return hideReviewed ? !elem.isReviewed : hideRemoved ? !elem.isRemoved : true
        // });

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
                                <FormFlagging videos={context.state.videosDisplayed} />
                            : context.state.pathname === urlsAvailable[2] ?
                                <div className="full-heigth">
                                    <Statistics />
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