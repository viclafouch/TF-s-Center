import { sevenLastDays } from '../utils/date'

export const storageDefault = {
  local: {
    videosToFlag: [],
    lastSearches: [],
  },
  sync: {
    displaying: 'column',
    theme: 'light',
    templates: [],
    searches: [],
    lastSevenDaysflagged: [...sevenLastDays],
  },
}

export const getStorages = (type) =>
  new Promise((resolve, reject) => {
    if (!chrome.runtime.lastError) {
      chrome.storage[type].get(storageDefault[type], (items) => resolve(items))
    } else {
      reject(`Error when loading storage ${type}`)
    }
  })

export const setStorage = (type, object) =>
  new Promise((resolve, reject) => {
    if (!chrome.runtime.lastError) {
      chrome.storage[type].set(object, (items) => resolve(items))
    } else {
      reject(`Error when loading storage ${type}`)
    }
  })
