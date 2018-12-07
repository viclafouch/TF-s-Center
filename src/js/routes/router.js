import React from 'react'
import AnalyticsContainer from '@containers/AnalyticsContainer/index';
import TemplatesContainer from '@containers/TemplatesContainer/index';
import { Switch } from 'react-router-dom'
import { getUrlParameter, getAllUrlParams } from '@utils/index';
import SearchesContainer from '@containers/SearchesContainer/index';
import HistoryContainer from '@containers/HistoryContainer/index';
import SearchVideosContainer from '@containers/SearchVideosContainer/index';
import { Route } from "@simple-contacts/react-router-async-routes";
import { YouTubeContext } from '@stores/YouTubeContext';

export const Loader = () => (
  <YouTubeContext.Consumer>
    {(context) => <div className={"isLoading" + ' loader-' + context.state.theme} style={{height: 'calc(100vh - 56px)', width: '100%'}} ></div>}
  </YouTubeContext.Consumer>
)

const AppRouter = ({context}) => (
    <Switch>
      <Route
        exact
        path="/flagging_history"
        async
        loading={<Loader />}
        render={async (props) => {
          await context.getVideos('history', getAllUrlParams())
          return <HistoryContainer {...props} />
        }}
      />
      <Route
        path="/deputy"
        async
        loading={<Loader />}
        render={async props => {
          const query = getUrlParameter('context') || "target"
        switch (query) {
          case "stats":
            await context.getBrowserDatas()
            return <AnalyticsContainer  {...props} />
          case "templates":
            await context.getBrowserDatas()
            return <TemplatesContainer {...props} />
          case "searches":
            await context.getBrowserDatas()
            return <SearchesContainer {...props} />
          case "targets":
            await context.getVideos('target')
            return <SearchVideosContainer {...props} />
          default:
            await context.getVideos('search')
            return <SearchVideosContainer {...props} />
        }
      }} />
    </Switch>
)

export default AppRouter;

