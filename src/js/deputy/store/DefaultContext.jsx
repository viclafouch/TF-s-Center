import React, { useReducer, useEffect } from 'react'
import DefaultReducer from './reducer/default'
import { setBrowserStorage } from '@utils/browser'

export const DefaultContext = React.createContext()

function DefaultProvider({ children, initialState }) {
  const [state, updater] = useReducer(DefaultReducer, initialState)

  useEffect(() => {
    setBrowserStorage('local', {
      searches: state.searches,
    })
  }, [state.searches])

  return (
    <DefaultContext.Provider value={[state, updater]}>
      {children}
    </DefaultContext.Provider>
  )
}

export default DefaultProvider
