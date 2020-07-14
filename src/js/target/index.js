import React, { createRef } from 'react'
import ReactDOM from 'react-dom'
import { throttle } from 'throttle-debounce'
import Video from '@shared/models/Video.model'
import Selection from './Selection/Selection'
import { getBrowserStorage } from '@utils/browser'

export const getTargets = () =>
  getBrowserStorage('local', [
    {
      key: 'targets',
      default: [],
      parser: videos => videos.map(v => new Video(v))
    }
  ]).then(({ targets }) => targets)

function createObserver() {
  const config = {
    childList: true,
    subtree: true
  }
  const observer = new MutationObserver(throttle(750, false, watchingDOM))
  observer.observe(document.body, config)
}

const selectors = [
  {
    name: 'search',
    listItem: '#contents ytd-video-renderer > .ytd-video-renderer#dismissable',
    data: {
      title: '#meta > #title-wrapper > h3 #video-title',
      videoUrl: '#meta > #title-wrapper > h3 #video-title',
      channelUrl: '#channel-name a',
      channelName: '#channel-name a',
      time: 'ytd-thumbnail-overlay-time-status-renderer',
      nbViews: '#metadata-line > span:first-child',
      createdAt: '#metadata-line > span:first-child + span'
    },
    root: {
      container: '#metadata-line',
      el: 'span',
      classNames: ['style-scope', 'ytd-video-meta-block']
    }
  },
  {
    name: 'channel-videos',
    listItem: '#page-manager ytd-browse #contents .ytd-grid-video-renderer#dismissable',
    data: {
      title: '#meta #video-title',
      videoUrl: 'a#video-title',
      time: 'ytd-thumbnail-overlay-time-status-renderer',
      nbViews: '#metadata-line > span:first-child',
      createdAt: '#metadata-line > span:first-child + span'
    },
    root: {
      container: '#metadata-line',
      el: 'span',
      classNames: ['style-scope', 'ytd-video-meta-block']
    }
  },
  {
    name: 'videos-playlist',
    listItem: '#items > ytd-playlist-panel-video-renderer#playlist-items',
    data: {
      title: '#meta #video-title',
      videoUrl: 'a#wc-endpoint',
      channelName: '#byline-containerz > span#byline'
    },
    root: {
      el: 'span',
      styles: 'align-self: flex-start;',
      classNames: ['style-scope', 'ytd-playlist-panel-video-renderer']
    }
  },
  {
    name: 'watch',
    listItem: 'ytd-app[is-watch-page] ytd-watch-flexy',
    data: {
      title: '#info-contents h1.title',
      channelUrl: '#upload-info > #channel-name a',
      channelName: '#upload-info > #channel-name a',
      time: '.ytp-time-display > span.ytp-time-duration',
      nbViews: '#info-text > #count span.short-view-count',
      createdAt: '#info-text > #date'
    },
    root: {
      container: '#menu-container #top-level-buttons',
      el: 'span',
      classNames: ['style-scope', 'ytd-menu-renderer', 'force-icon-button', 'style-default', 'size-default']
    }
  },
  {
    name: 'watch-list',
    listItem: 'ytd-app[is-watch-page] #related #items ytd-compact-video-renderer',
    data: {
      title: 'h3 #video-title',
      videoUrl: 'a#thumbnail',
      channelName: '#metadata #channel-name #text-container',
      time: '#overlays > ytd-thumbnail-overlay-time-status-renderer',
      nbViews: '#metadata > #metadata-line > span.ytd-video-meta-block:first-child',
      createdAt: '#metadata > #metadata-line > span.ytd-video-meta-block + span.ytd-video-meta-block'
    },
    root: {
      container: '.details > .metadata',
      el: 'span',
      classNames: ['style-scope', 'ytd-video-meta-block'],
      id: 'metadata-line'
    }
  }
]

const isValidItem = item => {
  for (const selector of selectors) {
    if (Object.keys(selector.data).every(i => !!item.querySelector(selector.data[i]))) {
      return {
        ...selector,
        item
      }
    }
  }
  return null
}

const listItems = selectors.map(s => s.listItem).join(', ')

const watchingDOM = () => {
  const currentUrl = new URL(window.location.href)

  // Debug watch page not reconstructed
  if (document.querySelector('ytd-watch-flexy[video-id][hidden][data-tf]')) {
    document.querySelector('ytd-watch-flexy[video-id][hidden][data-tf]').removeAttribute('data-tf')
  } else if (currentUrl.pathname.startsWith('/watch') && document.querySelector('ytd-watch-flexy[video-id][data-tf]')) {
    const newVideoId = document.querySelector('ytd-watch-flexy[video-id][data-tf]').getAttribute('video-id')
    const oldVideoId = document.querySelector('ytd-watch-flexy[video-id][data-tf]').getAttribute('data-tf')
    if (oldVideoId !== newVideoId) {
      document.querySelector('ytd-watch-flexy[video-id][data-tf]').removeAttribute('data-tf')
    }
  }

  const selectorItems = Array.from(document.querySelectorAll(listItems))
    .filter(element => !element.getAttribute('data-tf'))
    .reduce((previousValue, currentValue) => {
      const selectorItem = isValidItem(currentValue)
      if (selectorItem) previousValue.push(selectorItem)
      return previousValue
    }, [])

  selectorItems.forEach(selectorItem => {
    const { item, data, name, root } = selectorItem
    let id, el
    if (name !== 'watch') {
      const link = item.querySelector(data.videoUrl).href
      const paramsLink = new URL(link)
      id = paramsLink.searchParams.get('v')
      el = document.createElement(root.el)
    } else {
      id = new URL(window.location.href).searchParams.get('v')
      if (document.querySelector('[video-id]').getAttribute('video-id') !== id) return
      const container = item.querySelector(root.container)
      el = container.querySelector('ytd-button-renderer').cloneNode(true)
      container.appendChild(el)
    }

    const badgeNew = item.querySelector(
      'ytd-video-meta-block + ytd-badge-supported-renderer > .badge.badge-style-type-simple.style-scope.ytd-badge-supported-renderer'
    )
    if (name === 'watch-list' && badgeNew) badgeNew.parentNode.removeChild(badgeNew)

    item.setAttribute('data-tf', id)

    const video = new Video({
      id,
      title: data.title ? item.querySelector(data.title).textContent.trim() : '',
      time: data.time ? item.querySelector(data.time).textContent.trim() : '',
      nbViews: data.nbViews ? item.querySelector(data.nbViews).textContent.split(' ')[0].trim() : '',
      createdAt: data.createdAt ? item.querySelector(data.createdAt).textContent.trim() : '',
      channel: {
        url: data.channelUrl ? item.querySelector(data.channelUrl).href : '',
        name: data.channelName ? item.querySelector(data.channelName).textContent.trim() : ''
      }
    })

    if (name === 'channel-videos') {
      const url = new URL('https://www.youtube.com')
      url.pathname = document.getElementById('form').getAttribute('action')
      url.pathname = url.pathname.replace('/search', '')
      video.channel.url = url.toString()

      const name = document.querySelector('#inner-header-container #channel-name #text-container').textContent.trim()
      video.channel.name = name
    }

    let container
    if (name === 'videos-playlist') {
      container = item
    } else {
      container = item.querySelector(root.container)
    }

    if (root.styles) {
      el.setAttribute('style', root.styles)
    }

    el.classList.add('tf-root', ...(root.classNames || []))
    if (root.id) el.id = root.id
    const ref = createRef()
    el.addEventListener('click', e => {
      e.stopPropagation()
      ref.current.select()
    })

    getTargets().then(targets => {
      const defaultSelected = targets.some(t => t.id === video.id)
      ReactDOM.render(<Selection defaultSelected={defaultSelected} name={name} ref={ref} video={video} />, el)
      container.appendChild(el)
    })
  })
}

window.addEventListener('load', function () {
  getBrowserStorage('local', [
    {
      key: 'enableTargets',
      default: true
    }
  ]).then(({ enableTargets }) => {
    if (enableTargets) {
      createObserver()
    }
  })
})
