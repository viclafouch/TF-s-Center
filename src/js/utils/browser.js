import { wait } from '@utils'

export const browser = browser || chrome

export const clearStorages = async () => {
  chrome.storage.local.clear()
  chrome.storage.sync.clear()
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

/**
 * Set item(s) to a specitif type of browser storage
 * @param {string} type - local or sync
 * @param {object} items - items you want to set
 */
export const setBrowserStorage = (type, items) =>
  new Promise((resolve, reject) => {
    if (!['sync', 'local'].includes(type)) reject('Sync or Local as type allowed')
    if (!browser.runtime.lastError) {
      browser.storage[type].set(items, result => resolve(result))
    } else {
      console.error(browser.runtime.lastError.message)
      reject(`Error while setting items to the ${type} storage`)
    }
  })

/**
 * Get specitif storage from browser
 * @param {string} type - local or sync
 */
export const getBrowserStorage = (type, items = []) =>
  new Promise((resolve, reject) => {
    if (!['sync', 'local'].includes(type)) reject('Sync or Local as type allowed')
    if (!browser.runtime.lastError) {
      const keys = items.map(item => item.key)
      browser.storage[type].get(keys, result => {
        for (const item of items) {
          if (result[item.key] === undefined) {
            result[item.key] = item.default
          }

          if (typeof item.parser === 'function') {
            result[item.key] = item.parser(result[item.key])
          }
        }
        resolve(result)
      })
    } else {
      console.error(browser.runtime.lastError.message)
      reject(`Error when loading ${type} storage`)
    }
  })
