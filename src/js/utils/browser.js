import { wait } from "./utils";

export const clearStorages = async () => {
  chrome.storage.local.clear()
  chrome.storage.sync.clear()
  await wait(200);
  window.location.reload()
}

export function openInNewTab(url, newTab = false) {
  if (chrome.tabs) {
    return chrome.tabs.create({ active: true, url, pinned: false });
  } else {
    newTab = newTab ? '_blank' : false
    const win = window.open(url, newTab);
    win.focus();
  }
}