import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import Button from '../Button/Button'
import 'react-datepicker/dist/react-datepicker.min.css'
import { withRouter } from 'react-router'
import './tools.scoped.scss'
import { getUnixFromDate } from '@utils/date'

const defaultEndDate = new Date()
const defaultStartDate = new Date().setDate(defaultEndDate.getDate() - 7)

function Tools(props) {
  const [rangeDate, setRangeDate] = useState(() => {
    const urlSearchParams = new URLSearchParams(props.location.search)
    const endTime = urlSearchParams.get('end_time')
    const startTime = urlSearchParams.get('start_time')
    return {
      startDate: startTime ? new Date(parseInt(startTime) * 1000) : defaultStartDate,
      endDate: endTime ? new Date(parseInt(endTime) * 1000) : defaultEndDate
    }
  })

  const handleSubmit = e => {
    e.preventDefault()
    const searchParams = new URLSearchParams({
      start_time: getUnixFromDate(rangeDate.startDate),
      end_time: getUnixFromDate(rangeDate.endDate)
    })

    props.history.replace({
      pathname: '/flagging_history',
      search: `?${searchParams.toString()}`
    })
  }

  return (
    <div className={`tools ${props.isHistory ? 'tools-history' : ''}`}>
      <form className="tools-form-filter" onSubmit={handleSubmit}>
        <div className="tools-select-time">
          View flagging history from to
          <div className="wrapper-picker-date">
            <DatePicker
              selected={rangeDate.startDate}
              maxDate={rangeDate.endDate}
              showYearDropdown
              scrollableYearDropdown
              onChange={date =>
                setRangeDate(prevState => ({
                  ...prevState,
                  startDate: date
                }))
              }
            />
          </div>
          to
          <div className="wrapper-picker-date">
            <DatePicker
              selected={rangeDate.endDate}
              minDate={rangeDate.startDate}
              showYearDropdown
              scrollableYearDropdown
              onChange={date =>
                setRangeDate(prevState => ({
                  ...prevState,
                  endDate: date
                }))
              }
            />
          </div>
        </div>
        <Button color="blue" type="submit">
          Search
        </Button>
      </form>
    </div>
  )
}

export default withRouter(Tools)
