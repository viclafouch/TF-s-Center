import { getBrowserStorage, browser, setBadgeText } from '@utils/browser'

getBrowserStorage('local', [
  {
    key: 'targets',
    default: []
  }
]).then(({ targets }) => setBadgeText(targets.length))

browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === 'update-nb-targets' && request.payload.nbTargets !== undefined) {
    setBadgeText(request.payload.nbTargets)
    sendResponse(true)
  }
  return true
})
