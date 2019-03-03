import { Video } from '../shared/models/Video.class'

/**
 * Getting my all videos to an array
 * @return videos videos
 */

const video = function getVideo(idWatch, container) {
  let title,
    description,
    videoAddedTime,
    channelUrl,
    channelTitle,
    channelId,
    viewCount
  if (!container) {
    title = document.getElementsByTagName('h1')[0].textContent.trim()
    description = document.getElementById('description').textContent.trim()
    videoAddedTime = document.getElementsByClassName('date')[0].textContent
    channelUrl = document.getElementById('avatar').parentElement.href
    channelTitle = document
      .getElementById('owner-container')
      .firstElementChild.textContent.trim()
    channelId = document
      .getElementById('owner-container')
      .firstElementChild.firstElementChild.href.split('/channel/')[1]
    viewCount = document.getElementsByClassName('view-count')[0]
      ? document.getElementsByClassName('view-count')[0].textContent
      : ''
  } else {
    title = container.querySelector('#video-title').textContent.trim()
    if (container.querySelector('#description-text')) {
      description = container.querySelector('#description-text').textContent
      channelTitle = container.querySelector('yt-formatted-string#byline')
        .textContent
      channelUrl = container.querySelector('yt-formatted-string#byline')
        .firstElementChild.href
    } else {
      description = ''
      channelTitle = document.getElementById('channel-title').textContent
      channelUrl = document
        .getElementById('menu')
        .firstElementChild.href.split('/videos')[0]
    }

    viewCount = container.querySelector('#metadata-line').firstElementChild
      .textContent
    videoAddedTime = container.querySelector('#metadata-line').firstElementChild
      .nextSibling.textContent
    idWatch = new URL(
      container.querySelector('#video-title').href
    ).searchParams.get('v')
  }

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
