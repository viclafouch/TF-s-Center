import React, { createRef } from 'react'
import ReactDOM from 'react-dom'
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
  const observer = new MutationObserver(watchingDOM)
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
    let id
    if (name !== 'watch') {
      const link = item.querySelector(data.videoUrl).href
      const paramsLink = new URL(link)
      id = paramsLink.searchParams.get('v')
    } else {
      id = document.querySelector('[video-id]').getAttribute('video-id')
    }

    item.setAttribute('data-tf', id)

    const video = new Video({
      id,
      title: item.querySelector(data.title).textContent.trim(),
      time: item.querySelector(data.time).textContent.trim(),
      nbViews: item.querySelector(data.nbViews).textContent.split(' ')[0].trim(),
      createdAt: item.querySelector(data.createdAt).textContent.trim(),
      channel: {
        url: item.querySelector(data.channelUrl).href,
        name: item.querySelector(data.channelName).textContent.trim()
      }
    })

    const container = item.querySelector(root.container)
    const el = document.createElement('div')

    el.classList.add('tf-root', ...(root.classNames || []))
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
