import React from 'react'
import ReactDOM from 'react-dom';
import App from './components/App'

import getVideos from './getDom/_videos'
import getSearch from './getDom/_search'
import getPathname from './getDom/_location'
import getPagination from './getDom/_pagination'
import getStatistics from './getDom/_statistics'
import getUser from './getDom/_user'
import { urlsAvailable } from './config';

export const YouTubeContext = React.createContext();

chrome.runtime.sendMessage({ type: 'showPageAction' });

chrome.storage.local.get({
    displaying: 'column'
}, items => {
    let youTubeDatas = {
        pathname: getPathname(),
        videos: getVideos(),
        search: getSearch(),
        pagination: getPagination(),
        statistics: getPathname() === '/stats' ? getStatistics() : null,
        user: getUser()
    }

    const myReactApp = document.createElement("div");
    myReactApp.setAttribute("id", "TFsCenter");
    document.getElementById('page-container').innerHTML = '';
    document.getElementById('page-container').appendChild(myReactApp);

    class YouTubeProvider extends React.Component {

        constructor() {
            super();
            this.state = youTubeDatas;
            this.baseHide = {}

            this.state.videosDisplayed = youTubeDatas.videos
            this.state.hideRemoved = this.baseHide.hideRemoved = false
            this.state.hideReviewed = this.baseHide.hideReviewed = false
            this.state.canFlag = youTubeDatas.pathname === urlsAvailable[1]
            this.state.popupReportingOpened = false
            this.state.displaying = items.displaying
        }

        filterVideos(type) {
            const hides = Object.assign({}, this.baseHide);
            const { videos } = this.state
            hides[type] = !this.state[type];

            let videosDisplayed = videos.filter(video => {
                return hides.hideReviewed ? !video.isReviewed : hides.hideRemoved ? !video.isRemoved : true
            });

            return this.setState({
                videosDisplayed,
                hideRemoved: hides.hideRemoved,
                hideReviewed: hides.hideReviewed,
            });
        }

        callbackState(name, value) {
            if (name === 'displaying') {
                chrome.storage.local.set({
                    displaying: value
                });
            }
        }

        render() {
            return (
                <YouTubeContext.Provider value={{
                    state: this.state,
                    filterVideos: type => this.filterVideos(type),
                    setState: (name, value) => this.setState({
                        [name]: value
                    }, () => this.callbackState(name, value)),
                }}>{this.props.children}
                </YouTubeContext.Provider>
            )
        }
    }

    ReactDOM.render(
        <YouTubeProvider>
            <App />
        </YouTubeProvider>,
    myReactApp);
});