function setBadgeText(text) {
  chrome.browserAction.setBadgeText({
    text: text ? text.toString() : ''
  });
}

chrome.storage.local.get({
  videosToFlag: []
}, items => setBadgeText(items.videosToFlag.length))

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === 'updateBadgeText') {
      setBadgeText(message.videosToFlag.length)
    }
});

console.log('tets');


chrome.browserAction.onClicked.addListener(function (tab) {
  // chrome.tabs.insertCSS({ file: "style.css" });
  console.log(tab);

});


