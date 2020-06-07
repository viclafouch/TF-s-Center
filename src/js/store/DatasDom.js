import { fetchHistory, fetchStats, fetchSearch } from '@shared/api/Deputy'
import { isOnDeputyPage } from '@utils/index'
import getVideo from '../getDom/_video'
import getSearch from '../getDom/_search'
import getUser from '../getDom/_user'
import { getUrlParameter } from '@utils'

export default function (params, pathname, container) {
  const videoIdWatch = getUrlParameter('v')

  let promises = []
  if (videoIdWatch) {
    promises = [getVideo(videoIdWatch)]
  } else if (isOnDeputyPage()) {
    promises = [fetchStats(), getSearch(), getUser()]
    if (params.search_query) {
      promises.push(fetchSearch(params))
    } else {
      promises.push(fetchHistory(params))
    }
  } else if (pathname === '/results' || pathname.includes('/videos')) {
    promises = [getVideo(null, container)]
  }
  return Promise.all(promises)
}
