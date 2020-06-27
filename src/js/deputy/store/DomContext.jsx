import React, { useState } from 'react'

export const DomContext = React.createContext()

function DomProvider({ children, initialState }) {
  const [state] = useState(initialState)
  return <DomContext.Provider value={[state]}>{children}</DomContext.Provider>
}

export function withDomContext(Component) {
  return function contextComponent(props) {
    return <DomContext.Consumer>{context => <Component {...props} domContext={context[0]} />}</DomContext.Consumer>
  }
}

export default DomProvider
