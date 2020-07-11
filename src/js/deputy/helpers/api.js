import { extractAnalyticsInfos, extractVideoInfos } from './dom'

const fetchVideos = async (url, signal) => {
  const response = await fetch(url, { signal })
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

export const getVideosHistory = async ({ page, startTime, endTime }, signal) => {
  const url = new URL('https://www.youtube.com/flagging_history')
  if (page) url.searchParams.set('page', page)
  if (startTime) url.searchParams.set('start_time', startTime)
  if (endTime) url.searchParams.set('end_time', endTime)
  console.log(`Fetch ${url.toString()}...`)
  return fetchVideos(url, signal)
}

export const getParamsSearchVideos = ({ page, searchQuery, filters, excludeFlaggedVideos, searchId }) => {
  const searchParams = new URLSearchParams()
  searchParams.set('search_query', searchQuery)
  if (page) searchParams.set('page', page)
  if (filters && filters !== 'anytime') searchParams.set('filters', filters) // NOT ANYTIME NOT SAME RESULT
  if (excludeFlaggedVideos) searchParams.set('exclude_flagged_videos', 'true')
  if (searchId) searchParams.set('search_id', searchId)
  return searchParams.toString()
}

export const searchVideos = async (searchParamsString, signal) => {
  const url = new URL(`https://www.youtube.com/deputy?${searchParamsString}`)
  console.log(`Fetch ${url.toString()}...`)
  return fetchVideos(url, signal)
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
