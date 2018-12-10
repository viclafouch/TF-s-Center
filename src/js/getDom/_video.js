import { Video } from "../shared/models/Video.class";

/**
 * Getting my all videos to an array
 * @return videos videos
 */

let video = function getVideo(idWatch) {
  const title = document.getElementsByTagName('h1')[0].textContent.trim()
  const description = document.getElementById('description').textContent.trim()
  const videoAddedTime = document.getElementsByClassName('date')[0].textContent;
  const channelUrl = document.getElementById("avatar").parentElement.href
  const channelTitle = document.getElementById('owner-container').firstElementChild.textContent.trim()
  const channelId = document.getElementById('owner-container').firstElementChild.firstElementChild.href.split('/channel/')[1]
  const viewCount = document.getElementsByClassName('view-count')[0] ? document.getElementsByClassName('view-count')[0].textContent : ''

  return {
    watchedVideo: new Video({
      id: idWatch,
      viewCount,
      title,
      description,
      videoAddedTime,
      channelUrl,
      channelTitle,
      channelId
    })
  }
}


export default video