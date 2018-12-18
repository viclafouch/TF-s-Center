import React from 'react'
import ReactDOM from 'react-dom';
import App from '@components/App'
import { wait, getUrlParameter } from '@utils';
import YouTubeProvider, { YouTubeContext } from '@stores/YouTubeContext';
import { getStorages } from '@stores/BrowserStorage';
import getYouTubeDatasFromDOM from '@stores/DatasDom'
import { BrowserRouter } from 'react-router-dom'
import { getAllUrlParams, onDeputyLocation } from '@utils/index';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';

const style = [
  'background: linear-gradient(to right, #5433ff, #20bdff, #a5fecb);',
  'color: #fff',
  'padding: 10px 20px',
  'line-height: 35px'
].join(';');
console.log(`%cTF\'s Center on ${process.env.NODE_ENV} mode!`, style);

function initExtension(container = null) {

  const myReactApp = document.createElement('div')
  myReactApp.setAttribute("id", "TFsCenter")

  Promise.all([getStorages('local'), getStorages('sync')])
    .then(async storages => {
      const storage = storages.reduce((a, d) => Object.assign(d, a), {})
      const pathname = document.location.pathname

      const params = getAllUrlParams()
      const youtubeDatasFromDOM = await getYouTubeDatasFromDOM(params, pathname, container)

      const youtubeDatasDeputy = youtubeDatasFromDOM.reduce((a, d) => Object.assign(d, a), {})

      if (onDeputyLocation()) {
        while (!document.querySelector('[name="session_token"]')) await wait(50)
        const session_token = document.querySelector('[name="session_token"]').value
        youtubeDatasDeputy.session_token = session_token
        document.body.innerHTML = '';
        document.body.appendChild(myReactApp);
        document.documentElement.setAttribute('data-theme', storage.theme)
      } else if (pathname === '/watch') {
        myReactApp.setAttribute("id", "button-flag-TF")
        myReactApp.setAttribute("data-button-tf", "true")
        document.getElementById('menu-container').querySelector('#top-level-buttons').appendChild(myReactApp)
      } else {
        myReactApp.removeAttribute("id")
        myReactApp.setAttribute("data-button-tf", "true")
        container.querySelector('#metadata').appendChild(myReactApp)
      }

      await new Promise(resolve => ReactDOM.render(
        <ErrorBoundary>
          <YouTubeProvider storage={storage} youtubeDatasDeputy={youtubeDatasDeputy} >
            <BrowserRouter>
              <YouTubeContext.Consumer>
                {(context) => <App context={context} notification={context.state.notification} /> }
              </YouTubeContext.Consumer>
            </BrowserRouter>
          </YouTubeProvider>
        </ErrorBoundary>
      , myReactApp, resolve()))
    })
    .catch(e => {
      if (process.env.NODE_ENV === 'development') console.error(e)
      e = e.id ? e : (e.message || 'Unknown error')
      if (onDeputyLocation()) {
        document.body.innerHTML = '';
        document.body.appendChild(myReactApp)
        ReactDOM.render(<ErrorBoundary error={e} />, myReactApp)
      }
    })
    .finally(() => {
      onDeputyLocation() && document.body.classList.add('TFs-ready')
    })
}

onDeputyLocation() && initExtension()

// Watch page (asynchrone)
const canAppearOn = ['/watch', '/results']
const containers = new Set()
let actualHref = null
let arrivedOnCanAppear = false
window.onload = function () {

  function removeContainers() {
    for (const container of containers) {
      if (container.querySelector('[data-button-tf]')) {
        const element = container.querySelector('[data-button-tf]')
        ReactDOM.unmountComponentAtNode(element)
        element.parentNode.removeChild(element)
      }
      containers.delete(container)
    }
  }
  const observer = new MutationObserver(async () => {
    const { href, pathname } = document.location
    if (href !== actualHref) {
      arrivedOnCanAppear = false
      if (!canAppearOn.includes(pathname) && actualHref) actualHref = null
    }

    if (pathname === '/watch' && document.querySelector('[video-id]') && document.querySelector('[video-id]').getAttribute('video-id') === getUrlParameter('v') && document.getElementById('menu-container').querySelector('#top-level-buttons') && document.getElementById('owner-container') && document.getElementById("avatar") && !arrivedOnCanAppear) {
      arrivedOnCanAppear = true
      actualHref = href
      // await wait(500) // TODO // Actually, if you goback to the same watch video, the dom will be recreated.
      removeContainers()
      const container = document.getElementById('menu-container').querySelector('#top-level-buttons')
      containers.add(container)
      initExtension()
    }

    else if (pathname === '/results') {
      actualHref = href
      for (const container of Array.from(document.querySelectorAll('ytd-video-renderer'))) {
        if (!containers.has(container)) {
          containers.add(container)
          initExtension(container)
        }
      }
    }
  })

  const config = {
    childList: true,
    subtree: true
  }

  observer.observe(document.body, config);
};