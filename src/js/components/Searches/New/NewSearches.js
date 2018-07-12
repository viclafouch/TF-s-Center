import React, { Component } from 'react'
import Button from '../../Button';
import Input from '../../layouts/Input';
import Select from '../../layouts/Select';
import { trySearch } from '../../../utils'
import { Search } from '../../../shared/models/Search.class';

export class NewSearches extends Component {

    constructor() {
        super();

        this.state = {
            "search-value-add":  '',
            templateId: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let name = e.target.name
        let value = e.target.value
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
            templateId: this.state.templateId || null
        })], () => {
            this.setState({
                "search-value-add": ''
            });
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
                    <div className="mgi--top-10">
                        <Select
                            options={this.props.context.state.templates.map(elem => {
                                return {
                                    value: elem.id,
                                    title: elem.title
                                }
                            })}
                            value={this.state.templateId}
                            onChange={this.handleChange}
                            name="templateId"
                            null
                            defaultOptionTitle="Choose template"
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default NewSearches
