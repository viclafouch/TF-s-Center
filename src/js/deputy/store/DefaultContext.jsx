import React, { useReducer, useEffect, useCallback } from 'react'
import DefaultReducer from './reducer/default'
import { setBrowserStorage } from '@utils/browser'

export const DefaultContext = React.createContext()

function DefaultProvider({ children, initialState }) {
  const [state, updater] = useReducer(DefaultReducer, initialState)

  useEffect(() => {
    setBrowserStorage('local', {
      searches: state.searches,
      templates: state.templates,
      lastReportedEntities: state.lastReportedEntities,
      lastSearches: state.lastSearches,
      enableTargets: state.enableTargets
    })
  }, [state.searches, state.templates, state.lastReportedEntities, state.lastSearches, state.enableTargets])

  const getTemplate = useCallback(templateId => state.templates.find(t => t.id === templateId), [state.templates])

  const getSearch = useCallback(searchId => state.searches.find(t => t.id === searchId), [state.searches])

  const getTemplateBySearch = useCallback(
    searchId => {
      const currentSearch = getSearch(searchId)
      if (currentSearch) return getTemplate(currentSearch.templateId)
      return null
    },
    [getTemplate, getSearch]
  )

  return (
    <DefaultContext.Provider value={[{ ...state, getTemplate, getSearch, getTemplateBySearch }, updater]}>
      {children}
    </DefaultContext.Provider>
  )
}

export default DefaultProvider
