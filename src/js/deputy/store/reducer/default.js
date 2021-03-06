import produce from 'immer'
import {
  ADD_SEARCH,
  REMOVE_SEARCHES,
  ADD_TEMPLATE,
  REMOVE_TEMPLATE,
  EDIT_TEMPLATE,
  ADD_LAST_SEARCH,
  FLAG_ENTITIES,
  TOGGLE_ENABLE_TARGETS
} from './constants'

export default (state = {}, action) =>
  produce(state, draft => {
    let templateIndex, searchIndex
    switch (action.type) {
      case TOGGLE_ENABLE_TARGETS:
        draft.enableTargets = !state.enableTargets
        break
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
        templateIndex = state.templates.findIndex(t => t.id === action.payload.template.id)
        if (templateIndex !== -1) {
          draft.templates[templateIndex] = action.payload.template
        }
        break
      case REMOVE_TEMPLATE:
        draft.templates = state.templates.filter(template => template.id !== action.payload.templateId)
        break
      case ADD_LAST_SEARCH:
        const lastSearchValue = [
          {
            createdAt: Date.now(),
            value: action.payload.lastSearchValue
          }
        ]
        draft.lastSearches = lastSearchValue.concat(draft.lastSearches).reduce((previousValue, currentValue) => {
          if (!previousValue.some(s => s.value === currentValue.value) && previousValue.length < 5) {
            previousValue.push(currentValue)
          }
          return previousValue
        }, [])
        break
      case FLAG_ENTITIES:
        const { nbChannels, nbVideos, searchId, templateId } = action.payload
        draft.lastReportedEntities[draft.lastReportedEntities.length - 1].videos += nbVideos
        draft.lastReportedEntities[draft.lastReportedEntities.length - 1].channels += nbChannels
        if (searchId) {
          searchIndex = draft.searches.findIndex(s => s.id === searchId)
          if (searchIndex !== -1) {
            draft.searches[searchIndex].nbVideosFlagged += nbVideos
            draft.searches[searchIndex].nbChannelsFlagged += nbChannels
          }
        }
        if (templateId) {
          templateIndex = draft.templates.findIndex(t => t.id === templateId)
          if (templateIndex !== -1) {
            draft.templates[templateIndex].nbVideosFlagged += nbVideos
            draft.templates[templateIndex].nbChannelsFlagged += nbChannels
          }
        }
        break
      default:
        break
    }
    return draft
  })
