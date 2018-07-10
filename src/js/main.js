import React from 'react'
import ReactDOM from 'react-dom';
import App from './components/App'
import moment from 'moment'

import getVideos from './getDom/_videos'
import getSearch from './getDom/_search'
import getPathname from './getDom/_location'
import getPagination from './getDom/_pagination'
import getStatistics from './getDom/_statistics'
import getUser from './getDom/_user'
import { urlsAvailable } from './config';
import Template from './shared/models/Template.class'

export const YouTubeContext = React.createContext();

// chrome.storage.sync.clear();

chrome.runtime.sendMessage({ type: 'showPageAction' });

chrome.storage.sync.get({
    displaying: 'column',
    templates: []
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
            this.state.templates = items.templates.map(elem => new Template(elem))

            console.log(this.state.templates);

        }

        actionTemplate(template, callback) {

            let templates = this.state.templates;

            let templateIndex = templates.findIndex(x => x.id === template.id)

            if (templateIndex >= 0) {
                templates = templates.filter((e, i) => i !== templateIndex);
            } else {
                templates.unshift(template);
            }

            return chrome.storage.sync.set({
                templates: [...templates].map(e => {
                    e.created = e.created.format();
                    return e;
                })
            }, () => this.setState({
                templates: templates.map(e => {
                    e.created = moment(e.created)
                    return e;
                })
            }, () => callback && callback()));

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
                chrome.storage.sync.set({
                    displaying: value
                });
            }
        }

        render() {
            return (
                <YouTubeContext.Provider value={{
                    state: this.state,
                    filterVideos: type => this.filterVideos(type),
                    addTemplate: (template, callback) => this.actionTemplate(template, callback),
                    removeTemplate: (template, callback) => this.actionTemplate(template, callback),
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