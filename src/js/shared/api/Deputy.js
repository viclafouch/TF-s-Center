import getVideos from '../../getDom/_videos'
import getStatistics from '../../getDom/_statistics'
import queryString from 'query-string';
import { updateQueryStringParameter } from '@utils/index';

export const fetchHistory = (params = { page = null, start_time = null, end_time = null } = {}) => {
  const paramsAccepted = ['page', "start_time", "end_time"]
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
      if (fragment.querySelector('title').textContent.trim() === '500 Internal Server Error') throw new Error('INTERNAL_SERVER_ERROR')
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

export const fetchSearch = (params = { search_query = '', page = null, filters = null, exclude_flagged_videos = null, search_id  } = {}) => {
  const paramsAccepted = ['search_query', 'page', 'filters', 'exclude_flagged_videos', 'search_id']
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
      if (fragment.querySelector('title').textContent.trim() === '500 Internal Server Error') throw new Error('INTERNAL_SERVER_ERROR')
      return getVideos(fragment)
    })
}

export const fetchPostVideos = params => {
  const datas = queryString.stringify({
    selected_vid: params.videos.map(e => e.id),
    reason: params.reason,
    flag_comments: params.flag_comments,
    session_token: params.token
  })

  return fetch("/deputy?action_submit", {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: datas
  })
}