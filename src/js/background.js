function setBadgeText(text) {
  chrome.browserAction.setBadgeText({
    text: text ? text.toString() : ''
  });
}

chrome.storage.local.get({
  videosToFlag: []
}, items => setBadgeText(items.videosToFlag.length))

chrome.runtime.onMessage.addListener(function (message) {
    if (message.type === 'updateBadgeText') {
      setBadgeText(message.videosToFlag.length)
    }
});