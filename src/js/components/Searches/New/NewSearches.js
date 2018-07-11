import React, { Component } from 'react'
import Button from '../../Button';
import Input from '../../layouts/Input';

export class NewSearches extends Component {
    render() {
        return (
            <div className="box-material new-search-box">
            <form action="" className="form-search-add flex-me">
                <div>
                    <Input
                        type="text"
                        className="search-box-new-input"
                        name="template-title"
                        autoComplete="off"
                        spellCheck="false"
                        animeBottom
                    />
                </div>
                <Button blue className="mgi--left-7">Add</Button>
                <Button blue className="mgi--left-7">Test it</Button>
            </form>
            </div>
        )
    }
}

export default NewSearches
