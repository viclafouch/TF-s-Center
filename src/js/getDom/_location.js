import { urlsAvailable, querys } from '../config'
import { getUrlParameter } from '../utils'

let pathname = function getPathname() {
    let { pathname } = window.location;

    if (urlsAvailable.length > 1 && querys.length > 0) {
        if (pathname === urlsAvailable[1]) {
            if (getUrlParameter(querys[1]) === 'templates') {
                pathname = '/templates'
            } else if (getUrlParameter(querys[1]) === 'searches') {
                pathname = '/searches'
            } else if (getUrlParameter(querys[2])) {
                pathname = '/watch'
            } else if (!getUrlParameter(querys[0])) {
                pathname = '/stats'
            }
        }
    }

    return pathname;
}

export default pathname;
