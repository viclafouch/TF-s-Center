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
import Search from './shared/models/Search.class'

export const YouTubeContext = React.createContext();
const sevenLastDays = Array(7).fill().map((e, i) => {
    return {
        date: moment().subtract(i, 'days').format('DD/MM/YYYY'),
        videos: []
    }
});

// chrome.storage.sync.clear();

chrome.runtime.sendMessage({ type: 'showPageAction' });

chrome.storage.sync.get({
    displaying: 'column',
    templates: [],
    searches: [],
    flagged: [...sevenLastDays]

}, items => {

    let flagged = sevenLastDays.map(elem => {
        let flaggedFounded = items.flagged.find(x => x.date === elem.date);
        if (flaggedFounded) {
            return {
                date: elem.date,
                videos: flaggedFounded.videos
            }
        }
        return elem;
    })

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
            this.state.flagged = flagged
            this.state.templates = items.templates.map(elem => new Template(elem))
            this.state.searches = items.searches.map(elem => new Search(elem))
        }

        selectItems(items = [], type, force = false) {
            let itemsDisplayed = [...this.state[type]];

            if (force && itemsDisplayed.filter(x => x.selected).length === itemsDisplayed.length) {
                for (let index = 0; index < itemsDisplayed.length; index++) {
                    if (items.find(x => x.id === itemsDisplayed[index].id)) {
                        itemsDisplayed[index].selected = false
                    }
                }
            } else {
                for (let index = 0; index < itemsDisplayed.length; index++) {
                    if (items.find(x => x.id === itemsDisplayed[index].id)) {
                        itemsDisplayed[index].selected = force || !itemsDisplayed[index].selected
                    }
                }
            }

            this.setState({
                [type]: itemsDisplayed
            });
        }

        actionItem(arrayItems, type, callback) {

            let items = this.state[type];

            for (let index = 0; index < arrayItems.length; index++) {
                const element = arrayItems[index];
                let ItemIndex = items.findIndex(x => x.id === element.id)
                if (ItemIndex >= 0) {
                    items = items.filter((e, i) => i !== ItemIndex);
                } else {
                    items.unshift(element);
                }
            }

            return chrome.storage.sync.set({
                [type]: [...items].map(e => {
                    e.created = e.created.format();
                    return e;
                })
            }, () => this.setState({
                [type]: items.map(e => {
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
            } else if (name === 'flagged') {
                chrome.storage.sync.set({
                    flagged: value
                }, () => {
                    document.getElementById('formFlagging').submit();
                });
            }
        }

        render() {
            return (
                <YouTubeContext.Provider value={{
                    state: this.state,
                    selectVideos: (videos = []) => this.selectItems(videos, 'videosDisplayed'),
                    selectSearches: (searches = []) => this.selectItems(searches, 'searches'),
                    selectAll: (type, force = true) => this.selectItems(this.state[type], type, force),
                    filterVideos: type => this.filterVideos(type),
                    addTemplate: (template = [], callback) => this.actionItem(template, 'templates', callback),
                    removeTemplate: (template = [], callback) => this.actionItem(template, 'templates', callback),
                    addSearch: (search = [], callback) => this.actionItem(search, 'searches', callback),
                    removeSearch: (search = [], callback) => this.actionItem(search, 'searches', callback),
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