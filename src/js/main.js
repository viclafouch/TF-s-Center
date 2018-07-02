import React from 'react';
import ReactDOM from 'react-dom';
import { Video } from './shared/models/Video.class';
import { FormFlagging } from './components/FormFlagging/FormFlagging';
import { VideosList } from './components/VideosList/VideosList';
import { Sidebar } from './components/Sidebar/Sidebar';

class App extends React.Component {
    render() {

        let { videos } = this.props;
        console.log({videos});

        return (
            <React.Fragment>
                <Sidebar />
                <div className="main-container">
                    <FormFlagging videos={videos} />
                </div>
            </React.Fragment>
        )
    }
}

const { pathname } = window.location;
const urlsAvailable = ['/flagging_history', '/deputy']
const search = document.getElementById('masthead-search-term').value;


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