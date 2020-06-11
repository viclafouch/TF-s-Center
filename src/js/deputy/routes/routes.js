import React from 'react'
import { Switch, Route } from 'react-router'
import Page from '../components/Page/Page'
import Analytics from '../containers/Analytics/Analytics'
import Targets from '../containers/Targets/Targets'
import Templates from '../containers/Templates/Templates'
import Searches from '../containers/Searches/Searches'

function transformLocation(inputLocation) {
  const parsedQuery = new URLSearchParams(inputLocation.search)
  const contextQuery = parsedQuery.get('context')
  if (contextQuery === undefined) return inputLocation
  return {
    ...inputLocation,
    pathname: '/' + contextQuery
  }
}

function Routes() {
  return (
    <Route
      render={routeProps => (
        <Switch location={transformLocation(routeProps.location)}>
          <Page path="/analytics" component={Analytics} />
          <Page path="/targets" component={Targets} />
          <Page path="/templates" component={Templates} />
          <Page path="/searches" component={Searches} />
          <Route path="*">404</Route>
        </Switch>
      )}
    />
  )
}

export default Routes
