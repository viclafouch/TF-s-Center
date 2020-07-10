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
    name: 'home',
    listItem: '#contents > ytd-rich-item-renderer',
    data: {
      title: '#video-title-link > #video-title',
      videoUrl: '#video-title-link',
      channelUrl: '#channel-name a',
      channelName: '#channel-name a',
      time: 'ytd-thumbnail-overlay-time-status-renderer',
      nbViews: '#metadata-line > span:first-child',
      createdAt: '#metadata-line > span:first-child + span'
    },
    root: {
      container: '#byline-container + #metadata-line',
      el: 'span',
      classNames: ['style-scope', 'ytd-video-meta-block']
    }
  },
  {
    name: 'search',
    listItem: '#contents ytd-video-renderer > .ytd-video-renderer#dismissable',
    data: {
      title: '#video-title',
      videoUrl: '#video-title',
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
      channelName: '#metadata #channel-name',
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
      id = document.querySelector('[video-id]').getAttribute('video-id')
      const container = item.querySelector(root.container)
      el = container.querySelector('ytd-button-renderer').cloneNode(true)
      container.appendChild(el)
    }

    item.setAttribute('data-tf', id)

    const video = new Video({
      id,
      title: item.querySelector(data.title).textContent.trim(),
      time: item.querySelector(data.time).textContent.trim(),
      nbViews: item.querySelector(data.nbViews).textContent.split(' ')[0].trim(),
      createdAt: item.querySelector(data.createdAt).textContent.trim(),
      channel: {
        url: data.channelUrl ? item.querySelector(data.channelUrl).href : '',
        name: item.querySelector(data.channelName).textContent.trim()
      }
    })

    const container = item.querySelector(root.container)

    el.classList.add('tf-root', ...(root.classNames || []))
    if (root.id) el.id = root.id
    const ref = createRef()
    el.addEventListener('click', e => {
      e.stopPropagation()
      ref.current.select()
    })

    getTargets().then(targets => {
      ReactDOM.render(
        <Selection name={name} isDefaultSelected={targets.some(t => t.id === video.id)} ref={ref} video={video} />,
        el
      )
      container.appendChild(el)
    })
  })
}

window.addEventListener('load', function () {
  createObserver()
})
