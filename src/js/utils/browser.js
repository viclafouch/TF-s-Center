import { wait } from '@utils'

export const clearStorages = async () => {
  chrome.storage.local.clear()
  chrome.storage.sync.clear()
  await wait(200)
  window.location.reload()
}

export function openInNewTab(url, newTab = false) {
  if (chrome.tabs) {
    return chrome.tabs.create({ active: true, url, pinned: false })
  }
  newTab = newTab ? '_blank' : false
  const win = window.open(url, newTab)
  win.focus()
}

export const sendMessageToBackground = (type, items) =>
  new Promise((resolve, reject) => {
    if (!chrome.runtime.lastError) {
      chrome.runtime.sendMessage({ type, items }, response => resolve(response))
    } else {
      reject(`Error when sending message ${type}`)
    }
  })
