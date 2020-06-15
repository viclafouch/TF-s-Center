import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import Button from '../Button/Button'
import 'react-datepicker/dist/react-datepicker.min.css'
import { withRouter } from 'react-router'
import { getUnixFromDate, copyDate } from '@utils/date'
import useQuery from '@deputy/hooks/use-query'
import './tools.scoped.scss'

const defaultEndDate = new Date()
const defaultStartDate = new Date(copyDate(defaultEndDate).setDate(defaultEndDate.getDate() - 7))

function Tools(props) {
  const query = useQuery()
  const [rangeDate, setRangeDate] = useState(() => {
    const endTime = query.get('end_time')
    const startTime = query.get('start_time')
    return {
      startDate: startTime ? new Date(parseInt(startTime) * 1000) : defaultStartDate,
      endDate: endTime ? new Date(parseInt(endTime) * 1000) : defaultEndDate
    }
  })

  const handleSubmit = e => {
    e.preventDefault()
    if (props.isHistory) {
      props.onSubmit({
        startTime: getUnixFromDate(rangeDate.startDate),
        endTime: getUnixFromDate(rangeDate.endDate)
      })
    } else {
      const form = new FormData(e.target)
      props.onSubmit({
        searchQuery: form.get('search-query')
      })
    }
  }

  return (
    <div className={`tools ${props.isHistory ? 'tools-history' : 'tools-flagger'}`}>
      {props.isHistory && (
        <form className="tools-form-filter" onSubmit={handleSubmit}>
          <div className="tools-select-time">
            View flagging history from to
            <div className="wrapper-picker-date">
              <DatePicker
                selected={rangeDate.startDate}
                maxDate={rangeDate.endDate}
                showYearDropdown
                scrollableYearDropdown
                id="start-date"
                className="input-datepicker"
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
                id="end-date"
                className="input-datepicker"
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
      )}
      {!props.isHistory && (
        <form className="tools-form-filter" onSubmit={handleSubmit}>
          <div className="tools-filter">
            <input
              className="flagger-search-input"
              placeholder="Search"
              type="text"
              spellCheck="false"
              defaultValue={query.get('search_query')}
              aria-label="Search"
              autoComplete="off"
              autoCorrect="off"
              name="search-query"
            />
          </div>
          <Button color="blue" type="submit">
            Search
          </Button>
        </form>
      )}
    </div>
  )
}

export default withRouter(Tools)
