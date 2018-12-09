import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import Select from '@components/layouts/Select'
import onClickOutside from "react-onclickoutside";
import CountLetter from '@components/layouts/CountLetter';
import { Template } from '@shared/models/Template.class';
import { labels, MAX_TEMPLATES } from '../../../config/config';
import Input from '@components/layouts/Input';
import { TF_ERROR, randomId } from '@utils/index';
import { getStorages } from '@stores/BrowserStorage';

export class NewTemplate extends Component {

  constructor() {
    super();

    this.template = new Template();

    this.baseState = this.state = {
      "template-title": '',
      "template-description": '',
      "template-type": '',
      isOpen: false,
      formValid: false,
      isTooMany: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  async handleClickOutside(e) {
    e.preventDefault();
    if (!this.state.formValid) return this.setState({ isOpen: false })

    try {
      const { templates } = await getStorages('sync')
      if (templates.length > MAX_TEMPLATES) throw new TF_ERROR('MAX_TEMPLATES')
      await this.props.context.addTemplate([this.template])
      this.setState(this.baseState, () => this.template = new Template())
    } catch (error) {
      if (!this.state.isTooMany || error.code != 300) {
        this.setState({ isTooMany: error.code == 300 }, () => this.props.context.setState({
          notification: { id: randomId(), type: 'addTemplate', params: { level: 'error', message: error.code == 300 ? error.message : null }},
        }))
      }
    }
  }

  handleFormValid() {
    const title = this.state["template-title"].trim()
    const description = this.state['template-description'].trim()
    const type = this.state["template-type"]

    this.template.title = title
    this.template.description = description
    this.template.type = type

    return this.setState({
      formValid: title.length > 0 && labels.find(x => x.value === type) && description.length > 0 && description.length <= 500
    })
  }

  handleChange({target}) {
    const name = target.name
    const value = target.value

    return this.setState({
      [name]: value
    }, () => this.handleFormValid());
  }

  render() {
    return (
      <div className="new-template-box box-material" style={{height: this.state.isOpen ? 'auto' : 46}}>
        { !this.state.isOpen
          ?
          <div className="new-template-box-closed flex-me flex-align flex-justify-between box-description" onClick={() => this.setState({ isOpen: true })}>
            <p>New Template</p>
            <FontAwesomeIcon icon={faPlus} size="1x" fixedWidth />
          </div>
          :
          <div className="new-template-box-opened">
            <form method="POST" onSubmit={this.handleClickOutside}>
              <div className="template-box-new-title">
                <Input
                  type="text"
                  className="template-box-new-title-input"
                  name="template-title"
                  autoComplete="off"
                  placeholder="Title"
                  spellCheck="false"
                  onChange={this.handleChange}
                />
              </div>
              <div className="template-box-new-type pdi--left-12">
                <Select
                  value={this.state.type}
                  className="template-box-new-title-select"
                  onChange={this.handleChange}
                  name="template-type"
                  options={labels}
                  defaultOptionTitle="Select the issue"
                  null
                />
              </div>
              <div className="template-box-new-description">
                <textarea
                  id="content-template"
                  value={this.state["template-description"]}
                  className="pdi--15 template-box-new-title-content box-description scrollBarOnHover"
                  name="template-description"
                  autoFocus
                  spellCheck="false"
                  onChange={this.handleChange}
                  placeholder="New Template"
                  maxLength="500"
                ></textarea>
              </div>
              <div className="flex-me flex-justify-between pdi--bottom-7">
                <CountLetter text={this.state['template-description']} limit={500} />
              </div>
            </form>
          </div>
        }
      </div>
    )
  }
}

export default onClickOutside(NewTemplate);
