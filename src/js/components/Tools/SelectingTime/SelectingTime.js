import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import Button from '@components/Button';
import { updateQueryStringParameter, getUrlParameter } from '@utils'
import { copyDate, isValidDate, getUnixFromDate } from '@utils/date';

export class SelectingTime extends Component {

    constructor() {
        super();

        const today = new Date()

        this.state = {
            date_from: new Date(copyDate(today).setDate(today.getDate() - 7)),
            date_to: copyDate(today)
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(date = {}, type) {
        date !== null && this.setState({
            [type]: new Date(date)
        });
    }

    componentDidMount() {
        let timestamp_from = getUrlParameter('start_time');
        let timestamp_to = getUrlParameter('end_time');

        timestamp_from = new Date(timestamp_from * 1000)
        timestamp_to = new Date(timestamp_to * 1000)

        return this.setState((prevState) => {
            return {
                date_from: isValidDate(timestamp_from) ? timestamp_from : prevState.date_from,
                date_to: isValidDate(timestamp_to) ? timestamp_to : prevState.date_to
            };
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let timestamp_from = getUnixFromDate(this.state.date_from)
        let timestamp_to = getUnixFromDate(this.state.date_to)

        let url = updateQueryStringParameter(window.location.href, 'start_time', timestamp_from)
        url = updateQueryStringParameter(url, 'end_time', timestamp_to);

        return window.location.href = url;
    }

    render() {

        let minDate = {
            date_from: null,
            date_to: new Date(copyDate(this.state.date_from).setDate(this.state.date_from.getDate() + 1)),
        }

        let maxDate = {
            date_from: new Date(copyDate(this.state.date_to).setDate(this.state.date_to.getDate() - 1)),
            date_to: new Date()
        }

        return (
            <div className="tools-choosing-time">
                <form action="" onSubmit={this.handleSubmit} className="flex-me flex-align">
                    <span>View flagging history from to</span>
                    <DatePicker
                        selected={this.state.date_from}
                        className="input-colored"
                        onChange={date => this.handleChange(date, 'date_from')}
                        maxDate={maxDate.date_from}
                        minDate={minDate.date_from}
                        previousMonthButtonLabel=""
                        nextMonthButtonLabel=""
                    />
                    <span>to</span>
                    <DatePicker
                        className="input-colored"
                        selected={this.state.date_to}
                        onChange={date => this.handleChange(date, 'date_to')}
                        maxDate={maxDate.date_to}
                        minDate={minDate.date_to}
                        previousMonthButtonLabel=""
                        nextMonthButtonLabel=""
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