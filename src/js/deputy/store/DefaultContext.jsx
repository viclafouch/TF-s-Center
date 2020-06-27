import React, { useReducer, useEffect, useCallback } from 'react'
import DefaultReducer from './reducer/default'
import { setBrowserStorage } from '@utils/browser'

export const DefaultContext = React.createContext()

const defaultState = {
  selectedVideosId: [],
  selectedChannelsId: []
}

function DefaultProvider({ children, initialState }) {
  const [state, updater] = useReducer(DefaultReducer, Object.assign({}, { ...initialState, ...defaultState }))

  useEffect(() => {
    setBrowserStorage('local', {
      searches: state.searches,
      templates: state.templates,
      lastReportedEntities: state.lastReportedEntities
    })
  }, [state.searches, state.templates, state.lastReportedEntities])

  const getTemplate = useCallback(
    templateId => {
      return state.templates.find(t => t.id === templateId)
    },
    [state.templates]
  )

  return <DefaultContext.Provider value={[{ ...state, getTemplate }, updater]}>{children}</DefaultContext.Provider>
}

export default DefaultProvider
