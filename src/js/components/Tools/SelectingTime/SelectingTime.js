import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import Button from '../../Button';
import { updateQueryStringParameter, getUrlParameter } from '../../../utils'

export class SelectingTime extends Component {

    constructor() {
        super();

        this.state = {
            date_from: moment().subtract(7, 'days'),
            date_to: moment()
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(date = {}, type) {
        date !== null && this.setState({
            [type]: date
        });
    }

    componentDidMount() {
        let timestamp_from = getUrlParameter('start_time');
        let timestamp_to = getUrlParameter('end_time');

        timestamp_from = moment(new Date(timestamp_from * 1000))
        timestamp_to = moment(new Date(timestamp_to * 1000))

        return this.setState((prevState) => {
            return {
                date_from: timestamp_from.isValid() ? timestamp_from : prevState.date_from,
                date_to: timestamp_to.isValid() ? timestamp_to : prevState.date_to
            };
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let timestamp_from = moment(this.state.date_from).unix();
        let timestamp_to = moment(this.state.date_to).unix();

        let url = updateQueryStringParameter(window.location.href, 'start_time', timestamp_from)
        url = updateQueryStringParameter(url, 'end_time', timestamp_to);

        return window.location.href = url;
    }

    render() {

        let minDate = {
            date_from: null,
            date_to: moment(this.state.date_from).add(1, 'days')
        }

        let maxDate = {
            date_from: moment(this.state.date_to).subtract(1, 'days'),
            date_to: moment()
        }

        return (
            <div className="tools-choosing-time">
                <form action="" onSubmit={this.handleSubmit} className="flex-me flex-align">
                    <span>View flagging history from to</span>
                    <DatePicker
                        selected={this.state.date_from}
                        onChange={date => this.handleChange(date, 'date_from')}
                        maxDate={maxDate.date_from}
                        minDate={minDate.date_from}
                    />
                    <span>to</span>
                    <DatePicker
                        selected={this.state.date_to}
                        onChange={date => this.handleChange(date, 'date_to')}
                        maxDate={maxDate.date_to}
                        minDate={minDate.date_to}
                    />
                    <Button blue type="submit">
                        Go
                    </Button>
                </form>
            </div>
        )
    }
}

export default SelectingTime