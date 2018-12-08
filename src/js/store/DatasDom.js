import getVideo from './../getDom/_video'
import getSearch from './../getDom/_search'
import getUser from './../getDom/_user'
import getVideos from './../getDom/_videos'
import { getUrlParameter } from '@utils';
import { fetchHistory, fetchStats, fetchSearch } from '@shared/api/Deputy';

export default function (params) {
  const videoIdWatch = getUrlParameter('v')
  let promises = []
  if (videoIdWatch) {
    promises = [getVideo(videoIdWatch)]
  } else {
    promises = [fetchStats(), getSearch(), getUser()]
    if (params.search_query) {
      promises.push(fetchSearch(params))
    } else {
      promises.push(fetchHistory(params))
    }
  }
  return Promise.all(promises)
}