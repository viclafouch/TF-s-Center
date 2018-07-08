import React, { Component } from 'react'
import Select from '../../layouts/Select';

export class FilterPeriod extends Component {

    constructor() {
        super();

        this.periods = [
            { value: 'anytime', title: 'Anytime' },
            { value: 'hour', title: 'Last hour' },
            { value: 'today', title: 'Today' },
            { value: 'week', title: 'This week' },
            { value: 'month', title: 'This month' },
            { value: 'year', title: 'This year' },
        ]

        this.state = {
            filters: 'anytime'
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
        let filters = this.getUrlParameter('filters');

        return this.setState((prevState) => {
            return {
                filters: filters || prevState.filters
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
        let period = e.target.value;

        if (!this.periods.find(x => x.value == period)) return;

        let url = this.updateQueryStringParameter(window.location.href, 'filters', period)

        return window.location.href = url;
    }

    render() {
        return (
            <div className="tools-filter-period">
                <Select
                    blue
                    value={this.state.filters}
                    onChange={this.handleChange}
                    name="filterPeriod"
                    options={this.periods}
                    noEmptyOption
                />
            </div>
        )
    }
}

export default FilterPeriod
