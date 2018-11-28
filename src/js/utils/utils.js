export function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'), sParameterName, i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

export const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

export const copyDate = date => new Date(date.getTime())

const months = Array.from({length: 12}, (x, index) => (new Date(0, index).toLocaleDateString('en-US', { month: 'short'})))

export const getDateAwesome = date => date.getDate() + ' ' + months[date.getMonth()] + ' '+ date.getFullYear()

export const getDateFormat = (date) => date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()

export function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return uri + separator + key + "=" + value;
    }
}

export function openInNewTab(url, newTab = false) {
    newTab = newTab ? '_blank' : false
    var win = window.open(url, newTab);
    win.focus();
}

export const copyObject = (obj) => JSON.parse(JSON.stringify(obj));

export function trySearch(text, search, newTab = false) {
    let urlEncodade = encodeURIComponent('"' + text.trim() + '"').replace(/%20/g, '+');
    let url = `/deputy?search_query=${urlEncodade}`
    url = search ? url + `&searchId=${search.id}` : url
    return openInNewTab(url, newTab);
}

export function injectCss() {
  const style = document.createElement('style');
  style.type = "text/css";
  style.textContent = "body{height: 100vh; overflow: hidden}";
  (document.body || document.head || document.documentElement).appendChild(style);
}

String.prototype.cleanString = function () {
    return this
        .replace(/[áàãâä]/gi, "a")
        .replace(/[éè¨ê]/gi, "e")
        .replace(/[íìïî]/gi, "i")
        .replace(/[óòöôõ]/gi, "o")
        .replace(/[úùüû]/gi, "u")
        .replace(/[ç]/gi, "c")
        .replace(/[ñ]/gi, "n")
        .toLowerCase();
}