import React, { Component } from 'react'
import { YouTubeContext } from '@stores/YouTubeContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import TemplateListItem from './TemplateListItem'

export class ListTemplates extends Component {
  render() {
    return (
      <YouTubeContext.Consumer>
        {(context) => (
          <ul className="template-list">
            <TransitionGroup>
              {context.state.templates.map((elem) => (
                <CSSTransition
                  key={elem.id}
                  timeout={{
                    enter: 1000,
                    exit: 500,
                  }}
                  classNames="template"
                >
                  <li className="box-material">
                    <TemplateListItem template={elem} />
                  </li>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ul>
        )}
      </YouTubeContext.Consumer>
    )
  }
}

export default ListTemplates
