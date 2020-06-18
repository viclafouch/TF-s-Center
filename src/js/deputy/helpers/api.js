import { extractAnalyticsInfos, extractVideoInfos } from './dom'

const fetchVideos = async url => {
  const response = await fetch(url)
  const text = await response.text()
  const document = new DOMParser().parseFromString(text, 'text/html')
  const videos = Array.from(document.querySelectorAll('div.deputy-flag-item')).map(extractVideoInfos)
  const paginationDOM = document.querySelector('#deputy-flag-pager')
  let hasMore = false

  if (paginationDOM) {
    hasMore = paginationDOM.contains(document.querySelector("[data-link-type='next']"))
  }

  return { videos, hasMore }
}

export const getVideosHistory = async ({ page, startTime, endTime }) => {
  const url = new URL('https://www.youtube.com/flagging_history')
  if (page) url.searchParams.set('page', page)
  if (startTime) url.searchParams.set('start_time', startTime)
  if (endTime) url.searchParams.set('end_time', endTime)
  console.log(`Fetch ${url.toString()}...`)
  return fetchVideos(url)
}

export const getParamsSearchVideos = ({ page, searchQuery, filters, excludeFlaggedVideos }) => {
  const searchParams = new URLSearchParams()
  searchParams.set('search_query', searchQuery)
  if (page) searchParams.set('page', page)
  if (filters) searchParams.set('filters', filters)
  if (excludeFlaggedVideos) searchParams.set('exclude_flagged_videos', 'true')
  return searchParams.toString()
}

export const searchVideos = async searchParamsString => {
  const url = new URL(`https://www.youtube.com/deputy?${searchParamsString}`)
  console.log(`Fetch ${url.toString()}...`)
  return fetchVideos(url)
}

export const getAnalytics = async () => {
  const response = await fetch('https://www.youtube.com/deputy')
  const text = await response.text()
  const document = new DOMParser().parseFromString(text, 'text/html')
  return extractAnalyticsInfos(document.querySelector('body'))
}

// export const flagVideos = params =>
//   fetch('/deputy?action_submit', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//     body: queryString.stringify({
//       selected_vid: params.selected_vid,
//       video_report_reason: params.video_report_reason,
//       flag_comments: params.flag_comments,
//       session_token: params.session_token,
//       search_query: params.search_query || '',
//       page: params.page,
//       filters: params.filters || '',
//       video_ids: params.video_ids.join(',')
//     })
//   })
