import sanitizeHtml from 'sanitize-html'
import Video from '@shared/models/Video.model'

export const pageLoaded = async () => {
  while (document.querySelector('body.page-loaded') === null) {
    await new Promise(resolve => requestAnimationFrame(resolve))
  }
  return true
}

export const transformLabelToVideo = label => {
  const video = new Video()

  const url = new URL(label.querySelector('.deputy-item-description > h3 > a').href)
  video.id = url.searchParams.get('v')

  if (label.contains(label.querySelector('.removed-on-text'))) {
    const dataTimezone = label.querySelector('.removed-on-text > .client-timezone-time').getAttribute('data')
    video.removedAt = new Date(1e3 * dataTimezone).getTime()
  } else if (label.contains(label.querySelector('.reviewed-on-text'))) {
    const dataTimezone = label.querySelector('.reviewed-on-text > .client-timezone-time')
    if (dataTimezone) {
      video.reviewedAt = new Date(1e3 * dataTimezone.getAttribute('data')).getTime()
    } else {
      video.reviewedAt = 'unknown'
    }
  }

  if (video.isValidReviewedAt) {
    const title = label.querySelector('.deputy-item-description > h3 > a').textContent.trim()
    video.title = title

    const summary = sanitizeHtml(label.querySelector('.deputy-item-description > .deputy-item-description-summary').innerHTML)
    video.summary = summary

    const description = sanitizeHtml(label.querySelector('.deputy-item-description > .deputy-item-description-full').innerHTML)
    video.description = description

    const tags = Array.from(
      label.querySelectorAll('.deputy-item-description > .deputy-item-description-tags > span.deputy-video-tag')
    )
    video.tags = tags.map(tagElement => tagElement.getAttribute('title'))

    const nbViews = label.querySelector('.yt-notes > .viewcount').textContent.trim()
    video.nbViews = parseInt(nbViews.replace(/\D/g, ''))

    const channel = {
      name: label.querySelector('.yt-notes > a.yt-user-name').textContent,
      url: label.querySelector('.yt-notes > a.yt-user-name').href
    }
    video.channel = channel

    const createdAt = label.querySelector('.yt-notes > .video-date-added').textContent
    video.createdAt = createdAt
  }

  return video
}

export const getUserInfos = () => {
  const image = document.querySelector('.yt-thumb-27 img')
  const username = document.querySelector('.yt-masthead-picker-name').textContent
  const sessionToken = document.querySelector('input[name="session_token"]').value

  return {
    username,
    pictureUrl: image.src,
    sessionToken
  }
}
