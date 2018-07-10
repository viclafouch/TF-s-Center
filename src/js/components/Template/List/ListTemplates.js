import React, { Component } from 'react'
import { YouTubeContext } from '../../../main';
import TemplateListItem from './TemplateListItem';

export class ListTemplates extends Component {
    render() {
        return (
            <YouTubeContext.Consumer>
                {(context) => (
                    <ul className="template-list">
                        { context.state.templates.map((elem) => (
                            <li key={elem.id} className="box-template">
                                <TemplateListItem template={elem} />
                            </li>
                        ))}
                    </ul>
                )}
            </YouTubeContext.Consumer>
        )
    }
}

export default ListTemplates
