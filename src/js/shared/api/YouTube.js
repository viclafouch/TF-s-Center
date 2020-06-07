import Video from '@shared/models/Video.class'
import { TF_ERROR } from '@utils/index'
import { sendMessageToBackground } from '@utils/browser'

/**
 * Fetch a YouTube channel
 * @param {int} id - ID of the channel
 * @return object
 */
export const fetchYouTubeChannel = (channelID) =>
  sendMessageToBackground('fetchYouTubeChannel', { channelID }).then(
    (result) => {
      if (result.error) throw new TF_ERROR(result.error.id)
      return result
    }
  )

/**
 * Fetch a YouTube Video
 * @param {int} videoID - ID of the video
 * @return Video
 */
export const fetchYouTubeVideo = async (videoID) =>
  sendMessageToBackground('fetchYouTubeVideo', { videoID }).then((result) => {
    if (result.error) throw new TF_ERROR(result.error.id)
    return new Video({ ...result, id: videoID })
  })
