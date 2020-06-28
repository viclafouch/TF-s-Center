import produce from 'immer'
import {
  ADD_SEARCH,
  REMOVE_SEARCHES,
  ADD_TEMPLATE,
  REMOVE_TEMPLATE,
  EDIT_TEMPLATE,
  ADD_ENTITIES_TO_THIS_DAY,
  ADD_LAST_SEARCH
} from './constants'

export default (state = {}, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_SEARCH:
        draft.searches.push(action.payload.search)
        break
      case REMOVE_SEARCHES:
        draft.searches = state.searches.filter(search => action.payload.searchesId.findIndex(s => s === search.id) === -1)
        break
      case ADD_TEMPLATE:
        draft.templates.push(action.payload.template)
        break
      case EDIT_TEMPLATE:
        const templateIndex = state.templates.findIndex(t => t.id === action.payload.template.id)
        if (templateIndex !== -1) {
          draft.templates[templateIndex] = action.payload.template
        }
        break
      case REMOVE_TEMPLATE:
        draft.templates = state.templates.filter(template => template.id !== action.payload.templateId)
        break
      case ADD_LAST_SEARCH:
        draft.lastSearches.push(action.payload.lastSearch)
        break
      case ADD_ENTITIES_TO_THIS_DAY:
        const { nbChannels, nbVideos } = action.payload
        draft.lastReportedEntities[draft.lastReportedEntities.length - 1].videos += nbVideos
        draft.lastReportedEntities[draft.lastReportedEntities.length - 1].channels += nbChannels
        break
      default:
        break
    }
  })
