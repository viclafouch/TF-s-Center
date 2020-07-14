import { randomId } from '@utils/index'
import { videoLabels, channelLabels } from '@/js/config/config'

class Template {
  constructor(template = {}) {
    this.id = template.id || randomId()
    this.title = template.title || 'No title'
    this.description = template.description || ''
    this.videosReason = template.videosReason
    this.channelsReason = template.channelsReason
    this.nbVideosFlagged = template.nbVideosFlagged || 0
    this.nbChannelsFlagged = template.nbChannelsFlagged || 0
    this.createdAt = template.createdAt || Date.now()
  }

  get videosLabel() {
    if (this.videosReason) {
      return videoLabels.find(l => l.value === this.videosReason).title
    }
    return null
  }

  get channelsLabel() {
    if (this.channelsReason) {
      return channelLabels.find(l => l.value === this.channelsReason).title
    }
    return null
  }
}

export default Template
