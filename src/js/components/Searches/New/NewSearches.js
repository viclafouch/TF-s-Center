import React, { Component } from 'react'
import Button from '../../Button';
import Input from '../../layouts/Input';
import Select from '../../layouts/Select';
import { trySearch } from '../../../utils'
import { Search } from '../../../shared/models/Search.class';
import Checkbox from '../../layouts/Checkbox';

export class NewSearches extends Component {

    constructor() {
        super();

        this.state = this.baseState = {
            "search-value-add":  '',
            "search-template-id": '',
            "search-auto-select": false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let name = e.target.name
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        return this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let value = this.state["search-value-add"];

        if (value.trim() === '') return;

        return this.props.context.addSearch([new Search ({
            value: value,
            templateId: this.state["search-template-id"] || null,
            autoSelect: this.state["search-auto-select"]
        })], () => {
            this.setState(this.baseState);
        })
    }

    render() {
        return (
            <div className="box-material new-search-box">
                <form onSubmit={this.handleSubmit} className="form-search-add">
                    <div className="flex-me">
                        <div className="input-container-search">
                            <Input
                                type="text"
                                className="search-box-new-input"
                                name="search-value-add"
                                autoComplete="off"
                                placeholder="New search"
                                value={this.state["search-value-add"]}
                                spellCheck="false"
                                onChange={this.handleChange}
                            />
                        </div>
                        <Button blue className="mgi--left-7" type="submit">Add</Button>
                        <Button blue className="mgi--left-7" onClick={() => trySearch(this.state["search-value-add"].trim())} disabled={this.state["search-value-add"].trim() === ''}>Test</Button>
                    </div>
                    <div className="mgi--top-10 flex-me flex-align">
                        <Select
                            options={this.props.context.state.templates.map(elem => {
                                return {
                                    value: elem.id,
                                    title: elem.title
                                }
                            })}
                            value={this.state["search-template-id"]}
                            onChange={this.handleChange}
                            name="search-template-id"
                            null
                            defaultOptionTitle="Choose template"
                        />
                        <label className="yt-uix-button yt-uix-button-size-default yt-uix-button-primary flex-me flex-align mgi--left-7" htmlFor="search-auto-select">
                            <span className="mgi--right-6">Active auto-select</span>
                            <Checkbox
                                checked={this.state["search-auto-select"]}
                                onChange={this.handleChange}
                                name="search-auto-select"
                            />
                        </label>
                    </div>
                </form>
            </div>
        )
    }
}

export default NewSearches
