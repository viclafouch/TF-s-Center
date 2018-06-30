import React from 'react';
import ReactDOM from 'react-dom';
import { Video } from './shared/models/Video.class';

class App extends React.Component {
    render() {
        console.log(this.props);

        return (
            <div> Your App injected to DOM correctly! </div>
        )
    }
}

const newDiv = document.createElement("div");
newDiv.setAttribute("id", "chromeExtensionReactApp");
document.getElementById('page-container').appendChild(newDiv);

const list = document.getElementsByClassName('deputy-flag-item');
const videos = []

for (var item of list) {
    let nodeDescription = item.getElementsByClassName('deputy-item-description-summary')[0].innerHTML.trim();
    let textTitle = item.getElementsByTagName('h3')[0].textContent.trim();
    let url = 'https://www.youtube.com/'+item.getElementsByClassName('yt-uix-sessionlink ')[0].getAttribute('href');
    let nodeVideo = item.getElementsByClassName('deputy-item-thumb-player')[0].innerHTML.trim();
    videos.push(new Video({
        url: url,
        nodeVideo: nodeVideo,
        nodeDescription: nodeDescription,
        textTitle: textTitle
    }))
}
// document.getElementById('page').style.display = 'none'
ReactDOM.render(<App videos={videos} />, newDiv);