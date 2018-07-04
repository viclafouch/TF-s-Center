import React from 'react'
import ReactDOM from 'react-dom';
import App from './components/App'

import getVideos from './getDom/_videos'
import getSearch from './getDom/_search'
import getPathname from './getDom/_location'

let youTubeDatas = {
    pathname: getPathname(),
    videos: getVideos(),
    search: getSearch()
}

const myReactApp = document.createElement("div");
myReactApp.setAttribute("id", "TFsCenter");
document.getElementById('page-container').innerHTML = '';
document.getElementById('page-container').appendChild(myReactApp);

ReactDOM.render(
    <App {...youTubeDatas} />,
myReactApp);