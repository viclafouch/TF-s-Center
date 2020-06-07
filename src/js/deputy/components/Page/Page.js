import React from 'react'
import { Route } from 'react-router-dom'
import './page.scoped.scss'
import Sidebar from '../Sidebar/Sidebar'

const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest)
  return React.createElement(component, finalProps)
}

function Page(props) {
  const { component, ...rest } = props
  return (
    <div className="page">
      <Sidebar />
      <main>
        <Route
          {...rest}
          render={(routeProps) =>
            renderMergedProps(component, routeProps, rest)
          }
        />
      </main>
    </div>
  )
}

export default Page
