import React from 'react'
import NewTemplate from '@components/Template/New/NewTemplate'
import { ListTemplates } from '@components/Template/List/ListTemplates'
import { YouTubeContext } from '@stores/YouTubeContext'

const TemplatesContainer = () => (
  <div className="full-heigth main-body">
    <div className="template-container container-scrollable scrollBarOnHover">
      <div className="pdi--10">
        <YouTubeContext.Consumer>
          {context => <NewTemplate context={context} />}
        </YouTubeContext.Consumer>
      </div>
      <div className="pdi--10">
        <ListTemplates />
      </div>
    </div>
  </div>
)

export default TemplatesContainer
