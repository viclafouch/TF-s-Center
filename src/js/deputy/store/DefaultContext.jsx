import React, { useReducer, useEffect } from 'react'
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

  return <DefaultContext.Provider value={[state, updater]}>{children}</DefaultContext.Provider>
}

export default DefaultProvider
