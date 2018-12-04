import React from 'react'
import AnalyticsContainer from '@containers/AnalyticsContainer/index';
import TemplatesContainer from '@containers/TemplatesContainer/index';
import { Switch, Route } from 'react-router-dom'
import { getUrlParameter } from '@utils/index';
import SearchesContainer from '@containers/SearchesContainer/index';
import FormFlagging from '@components/FormFlagging/FormFlagging';
import { YouTubeContext } from '@stores/YouTubeContext';
import HistoryContainer from '@containers/HistoryContainer/index';

const AppRouter = () => (
  <YouTubeContext.Consumer>
    {(context) => (
      <React.Fragment>
        { context.state.isLoading && <div className="isLoading"></div> }
        <Switch>
          <Route exact path="/" component={TemplatesContainer} />
          <Route exact path="/flagging_history" component={HistoryContainer} />
          <Route path="/deputy" render={props => {
            const query = getUrlParameter('context') || "target"
            switch (query) {
              case "stats":
                return <AnalyticsContainer  {...props} />
              case "templates":
                return <TemplatesContainer {...props} />
              case "searches":
                return <SearchesContainer {...props} />
              default:
                return <FormFlagging {...props} context={context} />
            }
          }} />
          <Route path="/deputy?context=stats" />
        </Switch>
      </React.Fragment>
    )}
  </YouTubeContext.Consumer>
)

export default AppRouter;

