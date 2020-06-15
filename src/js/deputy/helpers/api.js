import { extractAnalyticsInfos, extractVideoInfos } from './dom'

const fetchVideos = async url => {
  const response = await fetch(url)
  const text = await response.text()
  const document = new DOMParser().parseFromString(text, 'text/html')
  const videos = Array.from(document.querySelectorAll('.deputy-flag-item')).map(extractVideoInfos)
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

export const searchVideos = async ({ page, searchQuery, filters }) => {
  const url = new URL('https://www.youtube.com/deputy')
  url.searchParams.set('search_query', searchQuery)
  if (page) url.searchParams.set('page', page)
  if (filters) url.searchParams.set('filters', filters)
  console.log(`Fetch ${url.toString()}...`)
  return fetchVideos(url)
}

export const getAnalytics = async () => {
  const response = await fetch('https://www.youtube.com/deputy')
  const text = await response.text()
  const document = new DOMParser().parseFromString(text, 'text/html')
  return extractAnalyticsInfos(document.querySelector('body'))
}
