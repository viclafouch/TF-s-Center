import { urlsAvailable, querys } from '../config'

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'), sParameterName, i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

let pathname = function getPathname() {
    let { pathname } = window.location;

    if (urlsAvailable.length > 1 && querys.length > 0) {
        if (pathname === urlsAvailable[1] && !getUrlParameter(querys[0])) {
            pathname = '/stats'
        }
    }

    return pathname;
}

export default pathname;
