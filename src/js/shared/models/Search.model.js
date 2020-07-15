import { immerable } from 'immer'
import { randomId } from '@utils/index'

class Search {
  constructor(search = {}) {
    this.id = search.id || randomId()
    this.value = search.value || ''
    this.templateId = search.templateId || ''
    this.nbVideosFlagged = search.nbVideosFlagged || 0
    this.nbChannelsFlagged = search.nbChannelsFlagged || 0
    this.createdAt = search.createdAt || Date.now()
    this.patterns = search.patterns || ''
    this[immerable] = true
  }
}

export default Search
