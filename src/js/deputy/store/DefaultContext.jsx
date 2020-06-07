import React, { useReducer } from 'react'
import produce from 'immer'

export const DefaultContext = React.createContext()

function DefaultProvider({ initialState, children }) {
  const [state, updater] = useReducer(produce, initialState)
  return (
    <DefaultContext.Provider value={[state, updater]}>
      {children}
    </DefaultContext.Provider>
  )
}

export default DefaultProvider
