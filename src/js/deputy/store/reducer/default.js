import produce from 'immer'
import { ADD_SEARCH, REMOVE_SEARCHES } from './constants'

export default (state = {}, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ADD_SEARCH:
        draft.searches.push(action.payload.search)
        break
      case REMOVE_SEARCHES:
        draft.searches = state.searches.filter((search) =>
          action.payload.searchesId.some((s) => s !== search.id)
        )
        break
      default:
        break
    }
  })
