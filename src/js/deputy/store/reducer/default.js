import produce from 'immer'
import { ADD_SEARCH, REMOVE_SEARCHES, ADD_TEMPLATE, REMOVE_TEMPLATE, EDIT_TEMPLATE } from './constants'

export default (state = {}, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_SEARCH:
        draft.searches.push(action.payload.search)
        break
      case REMOVE_SEARCHES:
        draft.searches = state.searches.filter(search => action.payload.searchesId.some(s => s !== search.id))
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
      default:
        break
    }
  })
