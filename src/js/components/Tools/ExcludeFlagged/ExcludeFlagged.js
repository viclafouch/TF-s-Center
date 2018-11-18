import React, { Component } from 'react'
import Checkbox from '../../layouts/Checkbox';
import { getUrlParameter, updateQueryStringParameter } from '../../../utils'

export class ExcludeFlagged extends Component {

    constructor() {
        super();

        this.state = {
            isExcluded: true
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let isExcluded = !(getUrlParameter('exclude_flagged_videos') == 'false')
        return this.setState({
            isExcluded: !!(isExcluded)
        });
    }

    handleChange(e) {
        let value = e.target.checked;
        if (this.props.disabled) return;
        let url = updateQueryStringParameter(window.location.href, 'exclude_flagged_videos', value)
        return window.location.href = url;
    }

    render() {
        return (
            <div className={'tool tools-exclude-flagged ' + (this.props.disabled ? 'tool-disabled' : '')}>
                <label className="yt-uix-button yt-uix-button-size-default yt-uix-button-primary flex-me flex-align" htmlFor="excluded-flagged">
                    <span className="mgi--right-6">Exclude previously flagged videos</span>
                    <Checkbox
                        disabled={this.props.disabled}
                        checked={this.state.isExcluded}
                        onChange={this.handleChange}
                        name="excluded-flagged"
                    />
                </label>
            </div>
        )
    }
}

export default ExcludeFlagged
