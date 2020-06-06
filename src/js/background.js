import { TF_ERROR } from '@utils/index.js'
import { YOUTUBE_API_KEYS } from '../../private.js'

const setBadgeText = text =>
  chrome.browserAction.setBadgeText({
    text: text ? text.toString() : ''
  })

chrome.storage.local.get(
  {
    videosToFlag: []
  },
  items => setBadgeText(items.videosToFlag.length)
)

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === 'updateBadgeText' && request.items) {
    setBadgeText(request.items.videosToFlag.length)
    sendResponse(true)
  } else if (request.type === 'fetchYouTubeVideo') {
    fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${request.items.videoID}&key=${YOUTUBE_API_KEYS}`
    )
      .then(response => response.json())
      .then(response => {
        if (!response.items) throw new Error()
        if (response.items.length < 1)
          throw new TF_ERROR('ERROR_GET_VIDEO_DELETED')
        return response.items[0].snippet
      })
      .then(video => sendResponse(video))
      .catch(error => sendResponse({ error }))
  } else if (request.type === 'fetchYouTubeChannel') {
    fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${request.items.channelID}&key=${YOUTUBE_API_KEYS}`
    )
      .then(response => response.json())
      .then(response => {
        if (!response.items) throw new Error()
        if (response.items.length < 1) throw new TF_ERROR('ERROR_GET_CHANNEL')
        return response.items[0].snippet
      })
      .then(channel => sendResponse(channel))
      .catch(error => sendResponse({ error }))
  }
  return true
})
