import { randomId } from '@utils/index'

export class Template {
  constructor(template = {}) {
    this.id = template.id || randomId()
    this.title = template.title || null
    this.description = template.description || null
    this.type = template.type || null
    this.nb_used = template.nb_used || 0
    this.nb_flagged = template.nb_flagged || 0
    this.created = template.created ? new Date(template.created) : new Date()
  }
}

export default Template
