import ERRORS from '../../../errors.json'

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

export const randomId = () => Math.floor(Math.random() * 1000000)

export const redirectToWebCache = (link, newTab = true) => window.open(`http://webcache.googleusercontent.com/search?q=cache:${link}`, newTab ? '_blank' : '')

export const setStateAsync = (state, self) =>  new Promise(resolve => self.setState(state, resolve))

export const wait = (amount = 0) => new Promise(resolve => setTimeout(resolve, amount));

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

export const copyObject = (obj) => JSON.parse(JSON.stringify(obj));

export const trySearch = (text, searchId) => {
    const urlEncodade = encodeURIComponent('"' + text.trim() + '"').replace(/%20/g, '+');
    let url = `/deputy?search_query=${urlEncodade}`
    url = searchId ? url + `&search_id=${searchId}` : url
    return url
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

export function getAllUrlParams(url) {
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  var obj = {};

  if (queryString) {
    queryString = queryString.split('#')[0];
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      var a = arr[i].split('=');
      var paramName = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      paramName = paramName.toLowerCase();
      if (typeof paramValue === 'string') paramValue = decodeURIComponent(paramValue.toLowerCase())

      if (paramName.match(/\[(\d+)?\]$/)) {
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        if (paramName.match(/\[\d+\]$/)) {
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          obj[key].push(paramValue);
        }
      } else {
        if (!obj[paramName]) {
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}

export const wrapURLs = (text = '', new_window) => {
  const url_pattern = /(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)(?:\.(?:[a-z\x{00a1}\-\x{ffff}0-9]+-?)*[a-z\x{00a1}\-\x{ffff}0-9]+)*(?:\.(?:[a-z\x{00a1}\-\x{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?/ig;

  const target = (new_window === true || new_window == null) ? '_blank' : '';

  return text.replace(url_pattern, url => {
    const protocol_pattern = /^(?:(?:https?|ftp):\/\/)/i;
    const href = protocol_pattern.test(url) ? url : 'http://' + url;
    return '<a href="' + href + '" target="' + target + '">' + url + '</a>';
  });
};


export function TF_ERROR(id) {
  const error_ = ERRORS[id]
  if (!error_) throw new Error('Unknown Error')
  Error.call(this)
  this.message = error_.message
  this.code = error_.code
  this.id = id
}

TF_ERROR.prototype = Object.create(Error.prototype)
TF_ERROR.prototype.constructor = TF_ERROR

export const uena = chn => window.btoa(unescape(encodeURIComponent(chn)))
export const aenu = chn => decodeURIComponent(escape(window.atob(chn)));