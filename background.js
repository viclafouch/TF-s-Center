function setBadgeText(text) {
  console.log(text.toString());

  chrome.browserAction.setBadgeText({
    text: text ? text.toString() : ''
  });
}

chrome.storage.local.get({
  videosToFlag: []
}, items => setBadgeText(items.videosToFlag.length))

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === 'showPageAction') {
        chrome.pageAction.show(sender.tab.id);
    }
    if (message.type === 'updateBadgeText') {
      setBadgeText(message.videosToFlag.length)
    }
});



