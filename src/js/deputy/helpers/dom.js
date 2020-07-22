import Video from '@shared/models/Video.model'

export const pageLoaded = async () => {
  while (document.querySelector('body.page-loaded') === null) {
    await new Promise(resolve => requestAnimationFrame(resolve))
  }
  return true
}

export const extractVideoInfos = item => {
  const video = new Video()

  const url = new URL(item.querySelector('.deputy-item-description > h3 > a').href)
  video.id = url.searchParams.get('v')

  if (item.contains(item.querySelector('.removed-on-text'))) {
    const dataTimezone = item.querySelector('.removed-on-text > .client-timezone-time').getAttribute('data')
    video.removedAt = new Date(1e3 * dataTimezone).getTime()
  } else if (item.contains(item.querySelector('.reviewed-on-text'))) {
    const dataTimezone = item.querySelector('.reviewed-on-text > .client-timezone-time')
    if (dataTimezone) {
      video.reviewedAt = new Date(1e3 * dataTimezone.getAttribute('data')).getTime()
    } else {
      video.reviewedAt = 'unknown'
    }
  }

  if (!video.removedAt && !item.contains(item.querySelector('.yt-notes'))) {
    video.removedAt = 'unknown' // Video private ?
  }

  if (!video.removedAt) {
    video.title = item.querySelector('.deputy-item-description > h3 > a').textContent.trim()

    video.summary = item.querySelector('.deputy-item-description > .deputy-item-description-summary').innerHTML

    video.description = item.querySelector('.deputy-item-description > .deputy-item-description-full').innerHTML

    video.tags = Array.from(
      item.querySelectorAll('.deputy-item-description > .deputy-item-description-tags > span.deputy-video-tag')
    ).map(tagElement => tagElement.getAttribute('title'))

    // Live ?
    if (item.contains(item.querySelector('.yt-notes > .viewcount'))) {
      const nbViews = item.querySelector('.yt-notes > .viewcount').textContent.trim()
      video.nbViews = parseInt(nbViews.replace(/\D/g, ''))
    }

    // Live ?
    if (item.contains(item.querySelector('.video-time'))) {
      video.time = item.querySelector('.video-time').textContent.trim()
    }
    video.channel = {
      name: item.querySelector('.yt-notes > a.yt-user-name').textContent,
      url: item.querySelector('.yt-notes > a.yt-user-name').href
    }
    video.createdAt = item.querySelector('.yt-notes > .video-date-added').textContent
  }

  return video
}

export const extractUserInfos = () => {
  const image = document.querySelector('.yt-thumb-27 img')
  const username = document.querySelector('.yt-masthead-picker-name').textContent
  const sessionToken = document.querySelector('input[name="session_token"]').value

  return {
    username,
    pictureUrl: image.src,
    sessionToken
  }
}

export const extractAnalyticsInfos = body => {
  const stats = body.querySelector('#report-stats')

  const [nbActioned, nbFlagged] = [
    stats.querySelector('.report-stat:first-child > span.report-stat-label:last-child').textContent,
    stats.querySelector('.report-stat:last-child > span.report-stat-label:last-child').textContent
  ]

  return {
    nbActioned: parseInt(nbActioned),
    nbFlagged: parseInt(nbFlagged)
  }
}
