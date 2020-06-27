import { randomId } from '@utils/index'

class Search {
  constructor(search = {}) {
    this.id = search.id || randomId()
    this.value = search.value || ''
    this.flaggedWith = search.flaggedWith || 0
    this.isEnableAutoSelect = search.isEnableAutoSelect || false
    this.templateId = search.templateId || ''
    this.createdAt = search.createdAt || Date.now()
  }
}

export default Search
