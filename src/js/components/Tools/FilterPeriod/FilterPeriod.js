import React, { Component } from 'react'
import Select from '@components/layouts/Select';
import { getUrlParameter, updateQueryStringParameter } from '@utils'
import { Redirect } from 'react-router'

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
      redirectTo: null,
      filters: 'anytime'
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const filters = getUrlParameter('filters')
    return this.setState((prevState) => ({
      filters: filters || prevState.filters
    }))
  }

  componentDidUpdate() {
    if (this.state.redirectTo) return this.setState({ redirectTo: null })
  }

  handleChange(e) {
    const period = e.target.value
    if (!this.periods.find(x => x.value == period) || this.props.disabled) return
    const url = updateQueryStringParameter(window.location.pathname + window.location.search, 'filters', period)
    return this.setState({ redirectTo: url })
  }

  render() {
    if (this.state.redirectTo) return <Redirect to={this.state.redirectTo} />
    return (
      <div className={'tool tools-filter-period ' + (this.props.disabled ? 'tool-disabled' : '')}>
        <Select
          blue
          disabled={this.props.disabled}
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
