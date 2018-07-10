import React, { Component } from 'react'
import Select from '../../layouts/Select';
import { getUrlParameter, updateQueryStringParameter } from '../../../utils'

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

    componentDidMount() {
        let filters = getUrlParameter('filters');

        return this.setState((prevState) => {
            return {
                filters: filters || prevState.filters
            };
        });
    }

    handleChange(e) {
        let period = e.target.value;

        if (!this.periods.find(x => x.value == period)) return;

        let url = updateQueryStringParameter(window.location.href, 'filters', period)

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
