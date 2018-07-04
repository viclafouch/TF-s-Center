import React from 'react';
import ReactDOM from 'react-dom';
import { Video } from './shared/models/Video.class';
import { FormFlagging } from './components/FormFlagging/FormFlagging';
import { VideosList } from './components/VideosList/VideosList';
import { Sidebar } from './components/Sidebar/Sidebar';
import { urlsAvailable } from './config';
import { ToolsFlag } from './components/ToolsFlag/ToolsFlag';

class App extends React.Component {

    constructor() {
        super();
        this.state = this.baseState = {
            hideRemoved: false,
            hideReviewed: false
        }
    }

    render() {

        let { videos, search, pathname } = this.props;
        console.log(this.state);

        return (
            <React.Fragment>
                <Sidebar />
                <div className="main-container">
                    {
                        pathname === urlsAvailable[0] &&
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
                            />
                            <VideosList
                                videos={videos}
                                hideRemoved={this.state.hideRemoved}
                                hideReviewed={this.state.hideReviewed}
                            />
                        </div>
                    }
                    {
                        pathname === urlsAvailable[1] &&
                        <FormFlagging videos={videos} search={search} />
                    }
                    {
                        pathname === urlsAvailable[2] &&
                        <div className="full-heigth">
                            <div>stats</div>
                        </div>
                    }
                </div>
            </React.Fragment>
        )
    }
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'), sParameterName, i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

var search = document.getElementById('masthead-search-term').value;
var { pathname } = window.location;
if (pathname === urlsAvailable[1] && !getUrlParameter('search_query')) {
    pathname = '/stats'
}




/**
 * Inject my react App
 */

/**
 * Getting my all videos to an array
 * @return videos videos
 */

const list = document.getElementsByClassName('deputy-flag-item yt-tile-default');

const videos = []

for (var item of list) {
    let creator, viewCount, channelLink = null;
    let nodeDescription = item.getElementsByClassName('deputy-item-description-summary')[0].innerHTML.trim();
    let textTitle = item.getElementsByTagName('h3')[0].textContent.trim();
    let url = item.getElementsByClassName('yt-uix-sessionlink ')[0].getAttribute('href');
    let thumbnail = item.getElementsByTagName('img')[0].getAttribute('src');
    let nodeVideo = item.getElementsByClassName('deputy-item-thumb-player')[0].innerHTML.trim();

    let isRemoved = item.getElementsByClassName('removed-on-text').length > 0;

    if (!isRemoved && item.getElementsByClassName('yt-user-name').length > 0) {
        creator = item.getElementsByClassName('yt-user-name')[0].textContent;
        channelLink = item.getElementsByClassName('yt-user-name')[0].getAttribute('href');
        viewCount = item.getElementsByClassName('viewcount')[0].textContent.replace(/\D+/g, '');
    } else {
        textTitle = nodeDescription = null;
    }

    videos.push(new Video({
        url: url,
        nodeVideo: nodeVideo,
        nodeDescription: nodeDescription,
        textTitle: textTitle,
        creator: creator,
        channelLink: channelLink,
        viewCount: viewCount,
        isRemoved: isRemoved,
        thumbnail: thumbnail
    }))
}

const myReactApp = document.createElement("div");
myReactApp.setAttribute("id", "TFsCenter");
document.getElementById('page-container').innerHTML = '';
document.getElementById('page-container').appendChild(myReactApp);

ReactDOM.render(
    <App
        videos={videos}
        search={search}
        pathname={pathname}
    />,
myReactApp);