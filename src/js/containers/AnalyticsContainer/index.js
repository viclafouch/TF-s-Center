import React from 'react'
import { YouTubeContext } from '@stores/YouTubeContext'
import TableResum from '@components/Statistics/TableResum/TableResum'
import LastSevenDays from '@components/Statistics/LastSevenDays/LastSevenDays'
import BestTemplates from '@components/Statistics/BestTemplates/BestTemplates'
import BestSearches from '@components/Statistics/BestSearches/BestSearches'

const AnalyticsContainer = () => (
  <div className="full-heigth main-body">
    <div className="analytics-container pdi--10 container-scrollable scrollBarOnHover">
      <div className="mgi--top-10">
        <TableResum />
      </div>
      <div className="mgi--10">
        <YouTubeContext.Consumer>
          {context => <LastSevenDays context={context} />}
        </YouTubeContext.Consumer>
      </div>
      <div className="mgi--20">
        <div className="row">
          <div className="column one-half pie-box box-material">
            <h2 className="title-chart center-text mgi--bottom-10">
              Templates sort by videos flagged
            </h2>
            <YouTubeContext.Consumer>
              {context => <BestTemplates context={context} />}
            </YouTubeContext.Consumer>
          </div>
          <div
            className="column one-half pie-box box-material"
            style={{ marginLeft: '4%' }}
          >
            <h2 className="title-chart center-text mgi--bottom-10">
              Searches sort by videos flagged
            </h2>
            <YouTubeContext.Consumer>
              {context => <BestSearches context={context} />}
            </YouTubeContext.Consumer>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default AnalyticsContainer
