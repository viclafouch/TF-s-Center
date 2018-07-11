import React, { Component } from 'react'
import Button from '../../Button';
import Input from '../../layouts/Input';
import { trySearch } from '../../../utils'
import { Search } from '../../../shared/models/Search.class';

export class NewSearches extends Component {

    constructor() {
        super();

        this.state = {
            search:  ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        return this.setState({
            search: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        let value = this.state.search;

        if (value.trim() === '') return;

        return this.props.context.addSearch([new Search ({
            value: value
        })], () => {
            this.setState({
                search: ''
            });
        })
    }

    render() {
        return (
            <div className="box-material new-search-box">
            <form onSubmit={this.handleSubmit} className="form-search-add flex-me">
                <div>
                    <Input
                        type="text"
                        className="search-box-new-input"
                        name="search-value-add"
                        autoComplete="off"
                        placeholder="New search"
                        value={this.state.search}
                        spellCheck="false"
                        onChange={this.handleChange}
                    />
                </div>
                <Button blue className="mgi--left-7" type="submit">Add</Button>
                    <Button blue className="mgi--left-7" onClick={() => trySearch(this.state.search.trim())} disabled={this.state.search.trim() === ''}>Test it</Button>
            </form>
            </div>
        )
    }
}

export default NewSearches
