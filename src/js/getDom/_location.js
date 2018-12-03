import { urlsAvailable, querys } from '../config/config'
import { getUrlParameter } from '@utils'

let pathname = function getPathname() {
    let { pathname } = window.location;
    const context = getUrlParameter(querys[1])

    if (pathname === urlsAvailable[1] && urlsAvailable.includes(`/${context}`)) {
      pathname = `/${context}` // Deputy with context
    } else if (pathname === urlsAvailable[1] && context === undefined) {
      pathname = getUrlParameter(querys[0]) ? urlsAvailable[1] : urlsAvailable[5] // Deputy search or videoToFlag
    } else if (pathname === urlsAvailable[0]) {
      pathname = '/flagging_history' // No Deputy but flag history
    } else if (getUrlParameter(querys[2])) {
      pathname = '/watch' // In a v=XXXX
    } else {
      pathname = null
    }

    return pathname;
}

export default pathname;
