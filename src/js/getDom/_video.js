import { Video } from "../shared/models/Video.class";
import moment from 'moment'

/**
 * Getting my all videos to an array
 * @return videos videos
 */

let video = function getVideo(idWatch) {
  const title = document.getElementsByTagName('h1')[0].textContent.trim();
  const description = document.getElementById('description').textContent.trim();
  const videoAddedTime = document.getElementsByClassName('date')[0].textContent;
  const channelUrl = document.getElementById("avatar").parentElement.href
  const channelTitle = document.getElementById('owner-container').textContent.trim();
  const viewCount = document.getElementsByClassName('view-count')[0] ? document.getElementsByClassName('view-count')[0].textContent : ''
  const isRemoved = false;
  const isReviewed = null;

  return new Video({
    id: idWatch,
    viewCount,
    title,
    description,
    videoAddedTime,
    channelUrl,
    isRemoved,
    isReviewed,
    channelTitle
  })
}


export default video