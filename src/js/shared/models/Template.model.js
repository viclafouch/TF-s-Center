import { randomId } from '@utils/index'
import { videoLabels, channelLabels } from '@/js/config/config'

class Template {
  constructor(template = {}) {
    this.id = template.id || randomId()
    this.title = template.title || ''
    this.description = template.description || ''
    this.videosReason = template.videosReason
    this.channelsReason = template.channelsReason
    this.flaggedWith = template.flaggedWith || 0
    this.createdAt = template.createdAt || Date.now()
  }

  get videosLabel() {
    return videoLabels.find(l => l.value === this.videosReason).title
  }

  get channelsLabel() {
    return channelLabels.find(l => l.value === this.channelsReason).title
  }
}

export default Template
