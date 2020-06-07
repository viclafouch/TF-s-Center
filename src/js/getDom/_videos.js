import { Video } from '../shared/models/Video.class'
import getPagination from './_pagination'

/**
 * Getting my all videos to an array
 * @return videos videos
 */

const videos = function getVideos(root = document) {
  const list = root.getElementsByClassName('deputy-flag-item yt-tile-default')

  const videos = []

  for (const item of list) {
    let channelTitle
    let channelUrl
    let videoAddedTime
    let viewCount = null
    let title = item.getElementsByTagName('h3')[0].textContent.trim()
    const description = item
      .getElementsByClassName('deputy-item-description-summary')[0]
      .innerHTML.trim()
    const id = item
      .getElementsByClassName('yt-uix-sessionlink ')[0]
      .getAttribute('href')
      .split('=')[1]

    const isRemoved = item.getElementsByClassName('removed-on-text').length > 0
    const isReviewed =
      item.getElementsByClassName('reviewed-on-text').length > 0
    const isAgeRestricted =
      item.getElementsByClassName('age-restricted-on-text').length > 0

    if (!isRemoved && item.getElementsByClassName('yt-user-name').length > 0) {
      videoAddedTime = item.getElementsByClassName('video-date-added')[0]
        .textContent
      channelTitle = item.getElementsByClassName('yt-user-name')[0].textContent
      channelUrl = item
        .getElementsByClassName('yt-user-name')[0]
        .getAttribute('href')
      viewCount = item.getElementsByClassName('viewcount')[0]
        ? item.getElementsByClassName('viewcount')[0].textContent
        : ''
    } else {
      title = null
    }

    videos.push(
      new Video({
        title,
        channelTitle,
        channelUrl,
        viewCount,
        id,
        videoAddedTime,
        description,
        isReviewed,
        isRemoved,
        isAgeRestricted,
      })
    )
  }

  return {
    videos,
    pagination: getPagination(root),
  }
}

export default videos
