import queryString from 'query-string'
import { updateQueryStringParameter, TF_ERROR } from '@utils/index'
import getVideos from '../../getDom/_videos'
import getStatistics from '../../getDom/_statistics'

export const fetchHistory = (params = {}) => {
  const paramsAccepted = ['page', 'start_time', 'end_time']
  let url = 'https://www.youtube.com/flagging_history'
  for (const iterator in params) {
    if (paramsAccepted.includes(iterator)) {
      url = updateQueryStringParameter(url, iterator, params[iterator])
    }
  }
  return fetch(url)
    .then(StreamResponse => StreamResponse.text())
    .then(StringReponse => {
      const fragment = document.createElement('div')
      fragment.innerHTML = StringReponse
      if (
        fragment.querySelector('title').textContent.trim() ===
        '500 Internal Server Error'
      )
        throw new TF_ERROR('INTERNAL_SERVER_ERROR')
      return getVideos(fragment)
    })
}

export const fetchStats = () =>
  fetch('https://www.youtube.com/deputy?context=stats')
    .then(StreamResponse => StreamResponse.text())
    .then(StringReponse => {
      const fragment = document.createElement('div')
      fragment.innerHTML = StringReponse
      return getStatistics(fragment)
    })

export const fetchSearch = (params = {}) => {
  const paramsAccepted = [
    'search_query',
    'page',
    'filters',
    'exclude_flagged_videos',
    'search_id'
  ]
  let url = 'https://www.youtube.com/deputy'
  for (const iterator in params) {
    if (paramsAccepted.includes(iterator)) {
      url = updateQueryStringParameter(url, iterator, params[iterator])
    }
  }
  return fetch(url)
    .then(StreamResponse => StreamResponse.text())
    .then(StringReponse => {
      const fragment = document.createElement('div')
      fragment.innerHTML = StringReponse
      if (
        fragment.querySelector('title').textContent.trim() ===
        '500 Internal Server Error'
      )
        throw new TF_ERROR('INTERNAL_SERVER_ERROR')
      return getVideos(fragment)
    })
}

export const fetchPostVideos = params =>
  fetch('/deputy?action_submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: queryString.stringify({
      selected_vid: params.selected_vid,
      video_report_reason: params.video_report_reason,
      flag_comments: params.flag_comments,
      session_token: params.session_token,
      search_query: params.search_query || '',
      page: params.page,
      filters: params.filters || '',
      video_ids: params.video_ids.join(',')
    })
  })
