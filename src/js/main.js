import React from 'react'
import ReactDOM from 'react-dom';
import App from './components/App'

import getVideos from './getDom/_videos'
import getSearch from './getDom/_search'
import getPathname from './getDom/_location'
import getPagination from './getDom/_pagination'

let youTubeDatas = {
    pathname: getPathname(),
    videos: getVideos(),
    search: getSearch(),
    pagination: getPagination()
}

console.log(youTubeDatas.videos);


const myReactApp = document.createElement("div");
myReactApp.setAttribute("id", "TFsCenter");
document.getElementById('page-container').innerHTML = '';
document.getElementById('page-container').appendChild(myReactApp);

// ReactDOM.render(
//     <App {...youTubeDatas} />,
// myReactApp);