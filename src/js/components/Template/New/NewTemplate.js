import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import Select from '../../layouts/Select'
import onClickOutside from "react-onclickoutside";
import CountLetter from '../../layouts/CountLetter';

export class NewTemplate extends Component {

    constructor() {
        super();

        this.labels = [
            { value: 'P', title: 'Sexual Content' },
            { value: 'G', title: 'Violent or Repulsive Content' },
            { value: 'R', title: 'Hateful or Abusive Content' },
            { value: 'X', title: 'Harmful Dangerous Acts' },
            { value: 'J', title: 'Child Abuse' },
            { value: 'Z', title: 'Spam' },
        ]

        this.baseState = this.state = {
            "template-title": '',
            "template-description": '',
            "template-type": '',
            isOpen: false,
            formValid: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    handleClickOutside(e) {
        if (!this.state.formValid) return;

        this.setState(this.baseState)
    };

    handleFormValid() {
        let title = this.state["template-title"].trim();
        let description = this.state['template-description'].trim();
        let type = this.state["template-type"].trim();

        this.setState({
            formValid: title.length > 0 && this.labels.find(x => x.value === type) && description.length > 0 && description.length <= 500
        });
    }

    handleChange(e) {
        let name = e.target.name
        let value = e.target.value

        this.setState({
            [name]: value
        }, () => this.handleFormValid());
    }

    render() {
        return (
            <div className="new-template-box" style={{height: this.state.isOpen ? 'auto' : 46}}>
            {
                !this.state.isOpen ?
                        <div className="new-template-box-closed flex-me flex-justify-between box-description" onClick={() => this.setState({ isOpen: true })}>
                        <p>New Template</p>
                        <FontAwesomeIcon icon={faPlus} size="1x" fixedWidth />
                    </div>
                :
                    <div className="new-template-box-opened">
                        <form method="POST">
                            <div className="template-box-new-title">
                                <input
                                    type="text"
                                    className="template-box-new-title-input"
                                    name="template-title"
                                    placeholder="Title"
                                    autoComplete="off"
                                    spellCheck="false"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="template-box-new-type">
                                <Select
                                    value={this.state.type}
                                    className="template-box-new-title-select"
                                    onChange={this.handleChange}
                                    name="template-type"
                                    options={this.labels}
                                    defaultOptionTitle="Select the issue"
                                    null
                                />
                            </div>
                            <div className="template-box-new-description">
                                <textarea
                                    id="content-template"
                                    value={this.state["template-description"]}
                                    className="template-box-new-title-content box-description scrollBarOnHover"
                                    name="template-description"
                                    autoFocus
                                    spellCheck="false"
                                    onChange={this.handleChange}
                                    placeholder="New Template"
                                    maxLength="500"
                                ></textarea>
                            </div>
                            <div className="flex-me flex-justify-end pdi--bottom-7 pdi--right-15">
                                <CountLetter
                                    text={this.state['template-description']}
                                    limit={500}
                                />
                            </div>

                        </form>
                    </div>
            }

            </div>
        )
    }
}

export default onClickOutside(NewTemplate);
