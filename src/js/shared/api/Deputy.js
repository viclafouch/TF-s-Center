import getVideos from '../../getDom/_videos'
import getStatistics from '../../getDom/_statistics'
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
      console.log(fragment);
      console.log(fragment.querySelector('title').textContent.trim());
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

export const fetchSearch = (params = { search_query = '', page = null, filters = null, exclude_flagged_videos = null  } = {}) => {
  const paramsAccepted = ['search_query', 'page', 'filters', 'exclude_flagged_videos']
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
      console.log(fragment);

      return getVideos(fragment)
    })
}