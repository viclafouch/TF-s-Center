import { randomId } from '@utils/index'
import { videoLabels } from '@/js/config/config'

class Template {
  constructor(template = {}) {
    this.id = template.id || randomId()
    this.title = template.title || ''
    this.description = template.description || ''
    this.reason = template.reason
    this.flaggedWith = template.flaggedWith || 0
    this.createdAt = template.createdAt || Date.now()
  }

  get label() {
    return videoLabels.find(l => l.value === this.reason).title
  }
}

export default Template
