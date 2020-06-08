import React, { useReducer } from 'react'
import DefaultReducer from './reducer/default'

export const DefaultContext = React.createContext()

const initialState = {
  searches: [],
}

function DefaultProvider({ children }) {
  const [state, updater] = useReducer(DefaultReducer, initialState)
  return (
    <DefaultContext.Provider value={[state, updater]}>
      {children}
    </DefaultContext.Provider>
  )
}

export default DefaultProvider
