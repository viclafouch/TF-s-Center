import React, { useState, memo, useRef, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause } from '@fortawesome/free-solid-svg-icons/faPause'
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay'
import DatePicker from 'react-datepicker'
import { toast } from 'react-toastify'
import Button from '../Button/Button'
import sheriffImg from '@img/sheriff.svg'
import { getUnixFromDate, copyDate } from '@utils/date'
import useQuery from '@deputy/hooks/use-query'
import { TOGGLE_ENABLE_TARGETS } from '@deputy/store/reducer/constants'
import Dialog from '../Dialog/Dialog'
import 'react-datepicker/dist/react-datepicker.min.css'
import './tools.scoped.scss'

const defaultEndDate = new Date()
const defaultStartDate = new Date(copyDate(defaultEndDate).setDate(defaultEndDate.getDate() - 7))

function Tools({
  dispatch,
  enableTargets,
  onSubmit,
  isHistory,
  isTargets,
  targets,
  canFlag,
  onFlag,
  handleSelectAll,
  nbSelected
}) {
  const dialogRef = useRef(null)
  const query = useQuery()
  const [rangeDate, setRangeDate] = useState(() => {
    const endTime = query.get('end_time')
    const startTime = query.get('start_time')
    return {
      startDate: startTime ? new Date(parseInt(startTime) * 1000) : defaultStartDate,
      endDate: endTime ? new Date(parseInt(endTime) * 1000) : defaultEndDate
    }
  })

  const updateEnableTargets = useCallback(async () => {
    const isOk = await dialogRef.current.ask()
    if (isOk) {
      dispatch({
        type: TOGGLE_ENABLE_TARGETS
      })
      toast.success(!enableTargets ? 'Functionality enabled' : 'Functionality disabled')
    }
  }, [enableTargets, dispatch])

  const handleSubmit = e => {
    e.preventDefault()
    if (isHistory) {
      onSubmit({
        startTime: getUnixFromDate(rangeDate.startDate),
        endTime: getUnixFromDate(rangeDate.endDate)
      })
    } else if (isTargets) {
      onSubmit()
    } else {
      const form = new FormData(e.target)
      if (form.get('search-query')) {
        onSubmit({
          searchQuery: form.get('search-query'),
          filters: form.get('filters'),
          excludeFlaggedVideos: form.get('exclude_flagged_videos')
        })
      }
    }
  }

  return (
    <div className={`tools ${isHistory ? 'tools-history' : 'tools-flagger'}`}>
      {isTargets && (
        <Dialog ref={dialogRef}>
          {enableTargets ? (
            <>
              Are you sure to pause the target feature ? The button{' '}
              <button className="dialog-targets-button" tabIndex="-1">
                Add <img src={sheriffImg} />{' '}
              </button>{' '}
              will not appear on youtube.com until you reactivate it.
            </>
          ) : (
            <>
              Are you sure to reactivate the target feature ? The button{' '}
              <button className="dialog-targets-button" tabIndex="-1">
                Add <img src={sheriffImg} />{' '}
              </button>{' '}
              will appear on youtube.com until you desactivate it.
            </>
          )}
        </Dialog>
      )}
      {isHistory && (
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
      {isTargets && (
        <div className="tools-targets">
          <div>
            <div className="tools-targets-title">
              <h2>Targets ({targets})</h2>
              <Button color={enableTargets ? 'orange' : 'green'} size="small" onClick={updateEnableTargets}>
                <FontAwesomeIcon icon={enableTargets ? faPause : faPlay} size="1x" fixedWidth />
              </Button>
            </div>
            <div>
              <Button color="blue" type="button" onClick={handleSubmit}>
                Refresh
              </Button>
              <Button color="blue" type="button" onClick={() => handleSelectAll('video')}>
                Select all videos
              </Button>
              <Button color="blue" type="button" onClick={() => handleSelectAll('channel')}>
                Select all channels
              </Button>
              <Button
                color="blue"
                type="button"
                disabled={!canFlag}
                onClick={e => {
                  e.preventDefault()
                  onFlag()
                }}
              >
                Flag {nbSelected > 0 && `(${nbSelected})`}
              </Button>
            </div>
          </div>
        </div>
      )}
      {!isHistory && !isTargets && (
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
                  defaultChecked={['true', null].includes(query.get('exclude_flagged_videos'))}
                />
                Exclude previously flagged videos
              </label>
            </div>
          </div>
          <div>
            <Button color="blue" type="submit">
              Search
            </Button>
            <Button color="blue" type="button" onClick={() => handleSelectAll('video')}>
              Select all videos
            </Button>
            <Button color="blue" type="button" onClick={() => handleSelectAll('channel')}>
              Select all channels
            </Button>
            <Button
              color="blue"
              type="button"
              disabled={!canFlag}
              onClick={e => {
                e.preventDefault()
                onFlag()
              }}
            >
              Flag {nbSelected > 0 && `(${nbSelected})`}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

export default memo(Tools)
