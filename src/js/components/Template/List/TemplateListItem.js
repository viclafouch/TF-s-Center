import React, { Component } from 'react'
import { labels } from '../../../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons/faTrashAlt'
import { YouTubeContext } from '../../../content_script';
import { getDateFormat } from '../../../utils/utils';

export class TemplateListItem extends Component {

    constructor() {
        super();

        this.state = {
            active: false
        }
    }

    render() {
        let { template } = this.props;
        let label = labels.find(x => x.value === template.type);

        return (
          <div>
            <article className={"template-item " + (this.state.active ? 'active' : '')} onClick={(e) => { e.preventDefault(); this.setState({ active: !this.state.active }) }}>
              <div className="flex-me flex-justify-between">
                <h2 className="title-template mgi--bottom-11">{template.title}</h2>
                <span className="type-template">{label ? label.title : ''}</span>
              </div>
              <p className="description-template">{template.description}</p>
              <div className="mgi--top-15 flex-me flex-justify-end date-template">
                <i>{getDateFormat(template.created)}</i>
              </div>
            </article>
            <YouTubeContext.Consumer>
              {(context) => (
                <div className="action-temp flex-me flex-justify-center flex-align">
                  <span style={{ cursor: 'pointer' }} onClick={() => this.setState({ active: false }, () => context.removeTemplate([template]))}>
                    <FontAwesomeIcon icon={faTrashAlt} size="2x" fixedWidth />
                  </span>
                </div>
              )}
            </YouTubeContext.Consumer>
          </div>
        )
    }
}

export default TemplateListItem
