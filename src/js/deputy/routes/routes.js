import React from 'react'
import { Switch } from 'react-router'
import Page from '../components/Page/Page'
import Deputy from '../containers/Deputy/Deputy'

function Routes() {
  return (
    <Switch>
      <Page path="/deputy">
        <Deputy />
      </Page>
    </Switch>
  )
}

export default Routes
