import React from 'react'
import AnalyticsContainer from '@containers/AnalyticsContainer/index';
import TemplatesContainer from '@containers/TemplatesContainer/index';
import { Switch, Route } from 'react-router-dom'
import { getUrlParameter } from '@utils/index';
import SearchesContainer from '@containers/SearchesContainer/index';
import { YouTubeContext } from '@stores/YouTubeContext';
import HistoryContainer from '@containers/HistoryContainer/index';
import SearchVideosContainer from '@containers/SearchVideosContainer/index';

const AppRouter = () => (
  <YouTubeContext.Consumer>
    {(context) => (
      <React.Fragment>
        { context.state.isLoading
        ?
          <div className={"isLoading" + ' loader-' + context.state.theme}></div>
        :
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
                return <SearchVideosContainer {...props } />
            }
          }} />
        </Switch>
        }
      </React.Fragment>
    )}
  </YouTubeContext.Consumer>
)

export default AppRouter;

