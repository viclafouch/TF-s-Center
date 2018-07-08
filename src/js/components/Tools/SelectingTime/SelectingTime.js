import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import Button from '../../Button';

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

    componentDidMount() {
        let timestamp_from = this.getUrlParameter('start_time');
        let timestamp_to = this.getUrlParameter('end_time');

        timestamp_from = moment(new Date(timestamp_from * 1000))
        timestamp_to = moment(new Date(timestamp_to * 1000))

        return this.setState((prevState) => {
            return {
                date_from: timestamp_from.isValid() ? timestamp_from : prevState.date_from,
                date_to: timestamp_to.isValid() ? timestamp_to : prevState.date_to
            };
        });
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

    handleSubmit(e) {
        e.preventDefault();

        let timestamp_from = moment(this.state.date_from).unix();
        let timestamp_to = moment(this.state.date_to).unix();

        let url = this.updateQueryStringParameter(window.location.href, 'start_time', timestamp_from)
        url = this.updateQueryStringParameter(url, 'end_time', timestamp_to);

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
                    <span>Vidéos signalées entre le</span>
                    <DatePicker
                        selected={this.state.date_from}
                        onChange={date => this.handleChange(date, 'date_from')}
                        maxDate={maxDate.date_from}
                        minDate={minDate.date_from}
                    />
                    <span>et le</span>
                    <DatePicker
                        selected={this.state.date_to}
                        onChange={date => this.handleChange(date, 'date_to')}
                        maxDate={maxDate.date_to}
                        minDate={minDate.date_to}
                    />
                    <Button blue type="submit">
                        Rechercher
                    </Button>
                </form>
            </div>
        )
    }
}

export default SelectingTime