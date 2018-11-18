import { urlsAvailable, querys } from '../config'
import { getUrlParameter } from '../utils'

let pathname = function getPathname() {
    let { pathname } = window.location;
    const context = getUrlParameter(querys[1])

    if (pathname === urlsAvailable[1] && urlsAvailable.includes(`/${context}`)) {
      pathname = `/${context}` // Deputy with context
    } else if (pathname === urlsAvailable[1] && context === undefined) {
      pathname = urlsAvailable[1] // Deputy without context
    } else if (pathname === urlsAvailable[0]) {
      pathname = '/flagging_history' // No Deputy but flag history
    } else if (getUrlParameter(querys[2])) {
      pathname = '/watch' // In a v=XXXX
    } else {
      pathname = null
    }

  console.log(pathname);


    return pathname;
}

export default pathname;
