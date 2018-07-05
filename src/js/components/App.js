import React, { Component } from 'react'
import { Sidebar } from './Sidebar/Sidebar';
import { ToolsFlag } from './ToolsFlag/ToolsFlag';
import { VideosList } from './VideosList/VideosList';
import { FormFlagging } from './FormFlagging/FormFlagging';
import { urlsAvailable } from '../config';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = this.baseState = {
            hideRemoved: false,
            hideReviewed: false
        }
    }

    render() {

        let { search, pathname, pagination } = this.props;
        let { hideRemoved, hideReviewed } = this.state;

        let videos = this.props.videos.filter(elem => {
            return hideReviewed ? true : hideRemoved ? !elem.isRemoved : true
        });

        return (
            <React.Fragment>
                <Sidebar />
                <div className="main-container">
                    {
                        pathname === urlsAvailable[0] ?
                        <div className="full-heigth">
                            <ToolsFlag
                                videos={videos}
                                hideRemoved={this.state.hideRemoved}
                                hideReviewed={this.state.hideReviewed}
                                handleTools={e => {
                                    const hides = Object.assign({}, this.baseState)
                                    hides[e.target.name] = !this.state[e.target.name]
                                    this.setState(hides)
                                }}
                                pagination={pagination}
                            />
                            <VideosList
                                videos={videos}
                            />
                        </div>

                        : pathname === urlsAvailable[1] ?
                        <FormFlagging
                            videos={videos}
                            search={search}
                            pagination={pagination}
                        />

                        : pathname === urlsAvailable[2] ?
                        <div className="full-heigth">
                            <div>stats</div>
                        </div>

                        : <div>This page do not exist</div>
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default App