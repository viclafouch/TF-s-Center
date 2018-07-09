import React, { Component } from 'react'
import Checkbox from '../../layouts/Checkbox';

export class ExcludeFlagged extends Component {

    constructor() {
        super();

        this.state = {
            isExcluded: true
        }

        this.handleChange = this.handleChange.bind(this);
    }

    getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'), sParameterName, i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

    componentDidMount() {
        let isExcluded = !(this.getUrlParameter('exclude_flagged_videos') == 'false')

        return this.setState((prevState) => {
            return {
                isExcluded: !!(isExcluded)
            };
        });
    }

    updateQueryStringParameter(uri, key, value) {
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        }
        else {
            return uri + separator + key + "=" + value;
        }
    }


    handleChange(e) {
        let value = e.target.checked;

        let url = this.updateQueryStringParameter(window.location.href, 'exclude_flagged_videos', value)

        return window.location.href = url;
    }

    render() {
        return (
            <div className="tools-exclude-flagged">
                <label className="yt-uix-button yt-uix-button-size-default yt-uix-button-primary flex-me flex-align" htmlFor="excluded-flagged">
                    <span className="mgi--right-6">Exclude previously flagged videos</span>
                    <Checkbox
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
