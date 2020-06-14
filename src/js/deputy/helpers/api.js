import { transformLabelToVideo } from './dom'

export const getVideosHistory = async ({ page, startTime, endTime }) => {
  const url = new URL('https://www.youtube.com/flagging_history')
  if (page) url.searchParams.set('page', page)
  if (startTime) url.searchParams.set('start_time', startTime)
  if (endTime) url.searchParams.set('end_time', endTime)
  console.log(`Fetch ${url.toString()}...`)
  const response = await fetch(url)
  const text = await response.text()
  const div = document.createElement('div')
  div.innerHTML = text
  const videos = Array.from(div.querySelectorAll('#video-search-results > label')).map(transformLabelToVideo)
  const paginationDOM = div.querySelector('#deputy-flag-pager')
  let hasMore = false

  if (paginationDOM) {
    hasMore = paginationDOM.contains(div.querySelector("[data-link-type='next']"))
  }

  return { videos, hasMore }
}
