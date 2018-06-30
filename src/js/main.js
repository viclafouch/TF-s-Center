import React from 'react';
import ReactDOM from 'react-dom';
import { Video } from './shared/models/Video.class';

class App extends React.Component {
    render() {

        let { videos } = this.props;
        console.log({videos});

        return (
            <div> App injected </div>
        )
    }
}

/**
 * Inject my react App
 */
const myReactApp = document.createElement("div");
myReactApp.setAttribute("id", "TFs-Center");
document.getElementById('page-container').appendChild(myReactApp);

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
        isRemoved: isRemoved
    }))
}

document.getElementById('page').style.display = 'none'
ReactDOM.render(<App videos={videos} />, myReactApp);