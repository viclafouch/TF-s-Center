import React, { useContext, useState, useMemo } from 'react'
import { toast } from 'react-toastify'
import { useImmer } from 'use-immer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import Button from '@deputy/components/Button/Button'
import { videoLabels, channelLabels, channelIssues } from '@/js/config/config'
import { randomId } from '@utils/index'
import { DomContext } from '@deputy/store/DomContext'
import { reportUrls } from '@deputy/helpers/api'
import './urls-report.scoped.scss'
import { DefaultContext } from '@deputy/store/DefaultContext'
import { FLAG_ENTITIES } from '@deputy/store/reducer/constants'

const checkValidation = infos => {
  if (infos.type === 'video') {
    return videoLabels.some(l => l.value === infos.category) && infos.urls.some(u => !!u.value.trim())
  } else if (infos.type === 'channel') {
    return (
      channelLabels.some(l => l.value === infos.category) &&
      infos.urls.some(u => !!u.value.trim()) &&
      channelIssues.some(i => infos.issues.some(issue => issue === i.value))
    )
  } else {
    return false
  }
}

const checkLinks = (type, urls = []) => {
  for (const { value } of urls) {
    if (value.trim() === '') continue
    else {
      try {
        const url = new URL(value)
        if (type === 'video') {
          if (!url.href.startsWith('https://www.youtube.com/watch?') && !url.href.startsWith('https://youtu.be/')) {
            return false
          }
        } else {
          if (
            !url.href.startsWith('https://www.youtube.com/channel/') &&
            !url.href.startsWith('https://www.youtube.com/c/') &&
            !url.href.startsWith('https://www.youtube.com/user/')
          ) {
            return false
          }
        }
      } catch (error) {
        console.warn(error)
        return false
      }
    }
  }

  return true
}

const initialState = {
  type: null,
  category: '',
  issues: [],
  urls: [
    {
      value: '',
      id: randomId()
    }
  ],
  comment: ''
}

function UrlsReport() {
  const [{ user }] = useContext(DomContext)
  const [, dispatch] = useContext(DefaultContext)
  const [isLoading, setIsLoading] = useState(false)
  const [infos, setInfos] = useImmer(initialState)
  const isFormValid = useMemo(() => checkValidation(infos), [infos])

  const addUrl = e => {
    e.preventDefault()
    setInfos(draft => {
      draft.urls.push({
        value: '',
        id: randomId(),
        isInvalid: false
      })
    })
  }

  const updateUrl = e => {
    const value = e.target.value
    const id = e.target.id
    setInfos(draft => {
      const index = draft.urls.findIndex(d => d.id == id)
      if (index !== -1) {
        draft.urls[index].value = value
      }
    })
  }

  const removeUrl = id => {
    setInfos(draft => {
      const index = draft.urls.findIndex(d => d.id === id)
      if (index !== -1) {
        draft.urls.splice(index, 1)
      }
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!isFormValid || isLoading) return
    const isLinksValid = checkLinks(infos.type, infos.urls)
    if (!isLinksValid) {
      toast.error('Some URLs are invalid.')
      return
    }

    try {
      setIsLoading(true)
      const formData = new FormData()
      formData.set('report_comments', infos.comment)
      formData.set('entity_type', infos.type)
      formData.set('action_bulk_submit', 1)
      formData.set('session_token', user.sessionToken)
      if (infos.type === 'video') {
        formData.set('video_report_reason', infos.category)
      } else {
        formData.set('channel_report_reason', infos.category)
        for (const issue of infos.issues) {
          formData.append('reason_entities', issue)
        }
      }

      const reportLinks = infos.urls.filter(link => link.value.trim() !== '')

      formData.set(
        'report_links',
        reportLinks.reduce((previousValue, currentValue) => {
          previousValue = previousValue + '\n' + currentValue.value
          return previousValue
        }, '')
      )
      const { success, error } = await reportUrls(formData)
      if (success) toast.success(success)
      if (error) toast.error(error)
      dispatch({
        type: FLAG_ENTITIES,
        payload: {
          nbVideos: infos.type === 'video' ? reportLinks.length : 0,
          nbChannels: infos.type === 'channel' ? reportLinks.length : 0
        }
      })
      setInfos(draft => {
        draft = initialState
        return draft
      })
    } catch (error) {
      toast.error('An unknown error has occurred')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="urls-report">
      <div className="header-urls-report">
        <h1 className="title-box">URLs report</h1>
      </div>
      <form className="urls-report-form" onSubmit={handleSubmit}>
        <p>
          Please select the report category that most closely reflects your concern about the content so that we can determine
          whether it violates our{' '}
          <a href="https://www.youtube.com/t/community_guidelines" target="_blank" rel="noreferrer">
            Community Guidelines
          </a>
          .
        </p>
        <fieldset>
          <legend>Entity Type</legend>
          <label className="report-radio-labdio">
            <span className="report-radio">
              <input
                type="radio"
                className="report-radio-input"
                name="entity-type"
                checked={infos.type === 'video'}
                onChange={() =>
                  setInfos(draft => {
                    draft.category = ''
                    draft.issues = []
                    draft.type = 'video'
                  })
                }
              />
              <span className="report-radio-element"></span>
            </span>
            Video
          </label>
          <label className="report-radio-labdio">
            <span className="report-radio">
              <input
                type="radio"
                className="report-radio-input"
                name="entity-type"
                checked={infos.type === 'channel'}
                onChange={() =>
                  setInfos(draft => {
                    draft.category = ''
                    draft.issues = []
                    draft.type = 'channel'
                  })
                }
              />
              <span className="report-radio-element"></span>
            </span>
            Channel
          </label>
        </fieldset>
        {infos.type && (
          <>
            <fieldset className="fieldset-video">
              <legend>{infos.type === 'video' ? 'Video' : 'Channel'}</legend>
              <p>
                Category: <span className="required-star">*</span>
              </p>
              <ul className="reason-list">
                {infos.type === 'video'
                  ? videoLabels.map(label => (
                      <li key={label.value}>
                        <label className="report-radio-labdio">
                          <span className="report-radio">
                            <input
                              type="radio"
                              className="report-radio-input"
                              name="video-reason"
                              value={label.value}
                              checked={label.value === infos.category}
                              onChange={e => {
                                const value = e.target.value
                                setInfos(draft => {
                                  draft.category = value
                                })
                              }}
                            />
                            <span className="report-radio-element"></span>
                          </span>
                          {label.title}
                        </label>
                      </li>
                    ))
                  : channelLabels.map(label => (
                      <li key={label.value}>
                        <label className="report-radio-labdio">
                          <span className="report-radio">
                            <input
                              type="radio"
                              className="report-radio-input"
                              name="channel-reason"
                              value={label.value}
                              checked={label.value === infos.category}
                              onChange={e => {
                                const value = e.target.value
                                setInfos(draft => {
                                  draft.category = value
                                })
                              }}
                            />
                            <span className="report-radio-element"></span>
                          </span>
                          {label.title}
                        </label>
                      </li>
                    ))}
              </ul>
              {infos.type === 'channel' && (
                <>
                  <p>
                    Please select where the issue is: <span className="required-star">*</span>
                  </p>
                  <ul>
                    {channelIssues.map(label => (
                      <li key={label.value}>
                        <label className="report-checkbox-ladbox">
                          <span className="report-checkbox">
                            <input
                              type="checkbox"
                              className="report-checkbox-input"
                              name="channel-issue"
                              value={label.value}
                              onChange={e => {
                                const isChecked = e.target.checked
                                setInfos(draft => {
                                  if (isChecked) draft.issues.push(label.value)
                                  else draft.issues = draft.issues.filter(i => i !== label.value)
                                })
                              }}
                            />
                            <span className="report-checkbox-element"></span>
                          </span>
                          {label.title}
                        </label>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <p>
                Please provide the FULL video URL(s) here. If you would like to submit more than one URL, please click the
                &quot;Add Additional&quot; button below: <span className="required-star">*</span>
              </p>
              <div className="list-input-url">
                {infos.urls.map(({ value, id }, index) => (
                  <div key={id} className="input-wrapper-url">
                    <input
                      className="input-url form-element"
                      spellCheck="false"
                      autoComplete="off"
                      value={value}
                      id={id}
                      placeholder={
                        infos.type === 'video' ? 'https://www.youtube.com/watch?v=' : 'https://www.youtube.com/channel/'
                      }
                      onChange={updateUrl}
                    />
                    {index > 0 && (
                      <span role="button" className="remove-url" onClick={() => removeUrl(id)}>
                        <FontAwesomeIcon icon={faTimes} size="1x" fixedWidth />
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <a href="#" role="button" className="add-additionnal" onClick={addUrl}>
                Add additional
              </a>
              <p className="report-description-comment">
                Please also provide any additional information which you think could help us verify the issue as quickly as
                possible:
              </p>
              <textarea
                className="comment-textarea"
                name="comment"
                value={infos.comment}
                placeholder="Details"
                onChange={e => {
                  const value = e.target.value
                  setInfos(draft => {
                    draft.comment = value
                  })
                }}
              ></textarea>
            </fieldset>
            <Button color="blue" isLoading={isLoading} disabled={isLoading || !isFormValid} size="big" type="submit">
              Submit
            </Button>
          </>
        )}
      </form>
    </div>
  )
}

export default UrlsReport
