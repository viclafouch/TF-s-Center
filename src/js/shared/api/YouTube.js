import { YOUTUBE_API_KEYS } from "@private";
import Video from "@shared/models/Video.class";
import { TF_ERROR } from "@utils/index";

/**
 * Fetch a YouTube channel
 * @param {int} id - ID of the channel
 * @return object
 */
export const fetchYouTubeChannel = channelID => fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelID}&key=${YOUTUBE_API_KEYS}`)
  .then(response => response.json())
  .then(response => {
    if (!response.items) throw new Error()
    if (!response.items.length) throw new TF_ERROR('ERROR_GET_CHANNEL')
    return response.items[0].snippet
  })

/**
 * Fetch a YouTube Video
 * @param {int} videoID - ID of the video
 * @return Video
 */
export const fetchYouTubeVideo = videoID => fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoID}&key=${YOUTUBE_API_KEYS}`)
    .then(response => response.json())
    .then(response => {
      if (!response.items) throw new Error()
      if (!response.items.length) throw new TF_ERROR('ERROR_GET_VIDEO_DELETED')
      return response.items[0].snippet
    })
    .then(video => new Video({ ...video, id: videoID }))