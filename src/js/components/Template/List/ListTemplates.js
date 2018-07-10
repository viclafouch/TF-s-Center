import React, { Component } from 'react'
import { YouTubeContext } from '../../../main';
import TemplateListItem from './TemplateListItem';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

export class ListTemplates extends Component {
    render() {
        return (
            <YouTubeContext.Consumer>
                {(context) => (
                    <ul className="template-list">
                        <CSSTransitionGroup transitionName="template" transitionEnterTimeout={1000} transitionLeaveTimeout={500}>
                            { context.state.templates.map((elem) => (
                                <li key={elem.id} className="box-template">
                                    <TemplateListItem template={elem} />
                                </li>
                            ))}
                        </CSSTransitionGroup>
                    </ul>
                )}
            </YouTubeContext.Consumer>
        )
    }
}

export default ListTemplates
