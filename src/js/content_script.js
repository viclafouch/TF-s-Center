import React from 'react'
import ReactDOM from 'react-dom';
import App from '@components/App'
import { wait, getUrlParameter } from '@utils';
import YouTubeProvider, { YouTubeContext } from '@stores/YouTubeContext';
import { getStorages } from '@stores/BrowserStorage';
import getYouTubeDatasFromDOM from '@stores/DatasDom'
import { BrowserRouter } from 'react-router-dom'
import { getAllUrlParams } from '@utils/index';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary';

const style = [
  'background: linear-gradient(to right, #5433ff, #20bdff, #a5fecb);',
  'color: #fff',
  'padding: 10px 20px',
  'line-height: 35px'
].join(';');
console.log(`%cTF\'s Center on ${process.env.NODE_ENV} mode!`, style);

function initExtension() {

  const myReactApp = document.createElement("div");
  myReactApp.setAttribute("id", "TFsCenter");

  Promise.all([getStorages('local'), getStorages('sync')])
    .then(async storages => {
      const storage = storages.reduce((a, d) => Object.assign(d, a), {});
      const pathname = window.location.pathname

      const params = getAllUrlParams()
      const youtubeDatasFromDOM = await getYouTubeDatasFromDOM(params)
      const youtubeDatasDeputy = youtubeDatasFromDOM.reduce((a, d) => Object.assign(d, a), {});

      if (pathname === '/watch') {
        myReactApp.setAttribute("id", "button-flag-TF");
        document.getElementById('info').querySelector('#top-level-buttons').appendChild(myReactApp);
      } else {
        while (!document.querySelector('[name="session_token"]')) await wait(50)
        const session_token = document.querySelector('[name="session_token"]').value
        youtubeDatasDeputy.session_token = session_token
        document.body.innerHTML = '';
        document.body.appendChild(myReactApp);
        document.documentElement.setAttribute('data-theme', storage.theme)
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
      console.log(e);
      e = e.id ? e : (e.message || 'Unknown error')
      if (pathname !== '/watch') {
        document.body.innerHTML = '';
        document.body.appendChild(myReactApp);
        ReactDOM.render(<ErrorBoundary error={e} />, myReactApp)
      } else {
        process.env.NODE_ENV === 'development' && console.error(e);
      }
    })
    .finally(() => {
      document.body.classList.add('TFs-ready')
    })
}

const pathname = window.location.pathname
if (pathname === '/deputy' || pathname === '/flagging_history') initExtension()

// Watch page (asynchrone)
let actualHref = null
window.onload = function () {
  const observer = new MutationObserver(() => {
    if (document.location.pathname !== '/watch' && actualHref) actualHref = null
    if (actualHref !== document.location.href && document.location.pathname === '/watch' && document.querySelector('[video-id]').getAttribute('video-id') === getUrlParameter('v') && document.getElementById('info').querySelector('#top-level-buttons')) {
      actualHref = document.location.href
      while (document.getElementById('#button-flag-TF')) {
        document.getElementById('#button-flag-TF').parentNode.removeChild(document.getElementById('#button-flag-TF'))
      }
      initExtension()
    }
  });

  const config = {
    childList: true,
    subtree: true
  }

  observer.observe(document.body, config);
};