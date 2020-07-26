import React, { createRef } from 'react'
import ReactDOM from 'react-dom'
import { throttle } from 'throttle-debounce'
import Video from '@shared/models/Video.model'
import Selection from './Selection/Selection'
import { getBrowserStorage } from '@utils/browser'
import { wait } from '@utils/index'
import sheriffImg from '@img/sheriff.svg'

export const getTargets = () =>
  getBrowserStorage('local', [
    {
      key: 'targets',
      default: [],
      parser: videos => videos.map(v => new Video(v))
    }
  ]).then(({ targets }) => targets)

function observeTargets() {
  const config = {
    childList: true,
    subtree: true
  }
  const observer = new MutationObserver(throttle(750, false, watchingTargets))
  observer.observe(document.body, config)
}

function observeReportHistory() {
  const config = {
    childList: true,
    subtree: true
  }
  const observer = new MutationObserver(watchingReportHistory)
  observer.observe(document.body, config)
}

const selectors = [
  {
    name: 'search',
    listItem: '#contents ytd-video-renderer > .ytd-video-renderer#dismissable:not([data-tf])',
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
    listItem: '#page-manager [page-subtype="channels"] #contents .ytd-grid-video-renderer#dismissable:not([data-tf])',
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
    listItem: '#items > ytd-playlist-panel-video-renderer#playlist-items:not([data-tf])',
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
    name: 'watch-list',
    listItem: 'ytd-app[is-watch-page] #related #items ytd-compact-video-renderer:not([data-tf])',
    data: {
      title: 'h3 #video-title',
      videoUrl: 'a#thumbnail',
      channelName: '#metadata #channel-name #text-container',
      time: '#overlays > ytd-thumbnail-overlay-time-status-renderer'
    },
    root: {
      container: '.details > .metadata',
      el: 'span',
      classNames: ['style-scope', 'ytd-video-meta-block'],
      id: 'metadata-line'
    }
  }
]

const isSelectorFound = item =>
  selectors.find(({ data, root }) => {
    const dataFound = Object.keys(data).every(i => !!item.querySelector(data[i]))
    const containerFound = root.container ? !!item.querySelector(root.container) : true
    return dataFound && containerFound
  })

const inWatchPage = new Set()
const inSearchPage = new Set()

/*
The page /watch is not destroyed when you change the page
So we have to clean all buttons created to be sure to avoid
duplications and conflicts
*/
const cleanWatchPage = () => {
  const watchVideo = Array.from(document.querySelectorAll('ytd-watch-flexy[video-id][data-tf]'))
  const watchList = Array.from(document.querySelectorAll('ytd-watch-flexy[video-id] ytd-compact-video-renderer[data-tf]'))
  const items = [...watchVideo, ...watchList]
  items.forEach(d => {
    if (d) {
      d.removeAttribute('data-tf')
    }
  })
  for (const clean of inWatchPage) clean()
  inWatchPage.clear()
}

/*
The page /watch is not destroyed when you change the page
So we have to clean all buttons created to be sure to avoid
duplications and conflicts
*/
const cleanSearchPage = () => {
  const searchList = document.querySelectorAll(
    'ytd-search #contents ytd-video-renderer > .ytd-video-renderer#dismissable[data-tf]'
  )
  searchList.forEach(d => d.removeAttribute('data-tf'))
  for (const clean of inSearchPage) clean()
  inSearchPage.clear()
}

const initReactApp = ({ el, video, container, name }) => {
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

  if (name === 'watch' || name === 'watch-list') {
    const clean = () => {
      ReactDOM.unmountComponentAtNode(el)
      el.remove()
    }
    inWatchPage.add(clean)
  } else if (name === 'search') {
    const clean = () => {
      ReactDOM.unmountComponentAtNode(el)
      el.remove()
    }
    inSearchPage.add(clean)
  }
}

const listItems = selectors.map(s => s.listItem).join(', ')

const watchingTargets = async () => {
  const { pathname, searchParams } = new URL(window.location.href)
  const watchItem = document.querySelector('ytd-watch-flexy[video-id]:not([hidden])')
  const isOnWatchPage = pathname.startsWith('/watch') && !!watchItem
  const alreadyExtensionInstalled = isOnWatchPage && !!document.querySelector('[data-name="watch"]')

  // You leave the /watch page. So we have to clean
  if (document.querySelector('ytd-watch-flexy[video-id][hidden][data-tf]')) {
    cleanWatchPage()
    await wait(200)
  }
  // You just move to an another watch video. So we have to clean
  else if (alreadyExtensionInstalled && watchItem.getAttribute('data-tf')) {
    const newVideoId = watchItem.getAttribute('video-id')
    const oldVideoId = watchItem.getAttribute('data-tf')
    if (oldVideoId !== newVideoId) {
      cleanWatchPage()
      await wait(200)
    }
  }

  // You just leave the search page. So we have to clean
  if (document.querySelector('#page-manager > ytd-search[hidden]')) {
    cleanSearchPage()
    await wait(200)
  }

  const selectorItems = Array.from(document.querySelectorAll(listItems))
    .filter(element => !element.getAttribute('data-tf'))
    .reduce((previousValue, currentValue) => {
      const selector = isSelectorFound(currentValue)
      if (selector) {
        previousValue.push({
          ...selector,
          item: currentValue
        })
      }
      return previousValue
    }, [])

  selectorItems.forEach(selectorItem => {
    const { item, data, name, root } = selectorItem
    const link = item.querySelector(data.videoUrl).href
    const paramsLink = new URL(link)
    const id = paramsLink.searchParams.get('v')
    const el = document.createElement(root.el)
    const container = name === 'videos-playlist' ? item : item.querySelector(root.container)
    el.classList.add('tf-root', ...(root.classNames || []))
    if (root.styles) el.setAttribute('style', root.styles)
    if (root.id) el.id = root.id

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
    } else if (name === 'watch-list') {
      // Some videos don't have views info
      const nbViewsElement = item.querySelector('#metadata > #metadata-line > span.ytd-video-meta-block:first-child')
      if (nbViewsElement) video.nbViews = nbViewsElement.textContent.split(' ')[0].trim()

      // Some videos don't have createdAt info
      const createdAtElement = item.querySelector(
        '#metadata > #metadata-line > span.ytd-video-meta-block + span.ytd-video-meta-block'
      )
      if (createdAtElement) video.createdAt = createdAtElement.textContent.trim()

      // remove bagde because I don't have place to add my extension :(
      item.querySelectorAll('ytd-badge-supported-renderer').forEach(i => i.remove())
    }

    initReactApp({ el, container, video, name })
  })

  // If page is clean, let's go to create our buttons
  if (isOnWatchPage && !alreadyExtensionInstalled) {
    const data = {
      title: '#info-contents h1.title',
      channelUrl: '#upload-info > #channel-name a',
      channelName: '#upload-info > #channel-name a',
      time: '.ytp-time-display > span.ytp-time-duration',
      createdAt: '#info-text > #date > yt-formatted-string',
      description: '#content > #description > .content'
    }
    const isWatchReady = Object.keys(data).every(d => !!watchItem.querySelector(data[d]))
    if (!isWatchReady) return
    const watchVideoId = searchParams.get('v')
    watchItem.setAttribute('data-tf', watchVideoId)

    const description = watchItem
      .querySelector(data.description)
      .outerText.replace(/\bhttps?:\/\/\S+/gi, '<a href="$&" target="_blank" rel="nofollow">$&</a>')

    const video = new Video({
      id: watchVideoId,
      title: watchItem.querySelector(data.title).textContent.trim(),
      time: watchItem.querySelector(data.time).textContent.trim(),
      description: description,
      createdAt: watchItem.querySelector(data.createdAt).textContent.trim(),
      channel: {
        url: watchItem.querySelector(data.channelUrl).href,
        name: watchItem.querySelector(data.channelName).textContent.trim()
      }
    })

    // Maybe not, example : https://www.youtube.com/watch?v=6V-EmRSQ_pc
    if (watchItem.querySelector('#info-text > #count span.short-view-count')) {
      video.nbViews = watchItem.querySelector('#info-text > #count span.short-view-count').textContent.split(' ')[0].trim()
    }

    video.summary = description.substring(0, 50)

    const containerWatch = document.querySelector('#menu-container #top-level-buttons')
    const elWatch = containerWatch.querySelector('ytd-button-renderer').cloneNode(true)
    containerWatch.appendChild(elWatch)
    initReactApp({
      el: elWatch,
      container: containerWatch,
      video,
      name: 'watch'
    })
  }
}

const watchingReportHistory = () => {
  if (
    document.querySelector('ytd-report-history-section-renderer') &&
    !document.querySelector('ytd-report-history-section-renderer').getAttribute('tf-report-history')
  ) {
    document.querySelector('ytd-report-history-section-renderer').setAttribute('tf-report-history', true)
    const el = document.createElement('p')
    el.style =
      'color: var(--yt-spec-text-secondary); font-size: var(--ytd-user-comment_-_font-size); font-weight: var(--ytd-user-comment_-_font-weight); line-height: var(--ytd-user-comment_-_line-height);letter-spacing: var(--ytd-user-comment_-_letter-spacing); margin-top: 8px; display: flex; align-items: center;'
    el.innerHTML = `<a class="yt-simple-endpoint style-scope yt-formatted-string" spellcheck="false" href="/deputy?context=dashboard" dir="auto">TF Center</a><img style="width: 12px; display: inline-block; margin-left: 5px;" src="${sheriffImg}" />`
    document.getElementById('introduction-text').appendChild(el)
    return
  }
}

window.addEventListener('load', function () {
  observeReportHistory()
  getBrowserStorage('local', [
    {
      key: 'enableTargets',
      default: true
    }
  ]).then(({ enableTargets }) => {
    if (enableTargets) observeTargets()
  })
})
