import React, { useState, memo } from 'react'
import DatePicker from 'react-datepicker'
import Button from '../Button/Button'
import { getUnixFromDate, copyDate } from '@utils/date'
import useQuery from '@deputy/hooks/use-query'
import 'react-datepicker/dist/react-datepicker.min.css'
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
        searchQuery: form.get('search-query'),
        filters: form.get('filters'),
        excludeFlaggedVideos: form.get('exclude_flagged_videos')
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
                maxDate={new Date()}
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
            <div className="tools-field">
              <input
                className="flagger-search-input tools-form-element"
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
            <div className="tools-field">
              <select className="tools-form-element" name="filters" defaultValue={query.get('filters')}>
                <option value="anytime">Anytime</option>
                <option value="hour">Last hour</option>
                <option value="today">Today</option>
                <option value="week">This week</option>
                <option value="month">This month</option>
                <option value="year">This year</option>
              </select>
            </div>
            <div className="tools-field">
              <label className="tools-form-element">
                <input
                  type="checkbox"
                  name="exclude_flagged_videos"
                  defaultChecked={query.get('exclude_flagged_videos') === 'true'}
                />
                Exclude previously flagged videos
              </label>
            </div>
          </div>
          <div>
            <Button color="blue" type="submit">
              Search
            </Button>
            <Button
              color="blue"
              type="button"
              disabled={!props.canFlag}
              onClick={e => {
                e.preventDefault()
                props.onFlag()
              }}
            >
              Flag
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

export default memo(Tools)
