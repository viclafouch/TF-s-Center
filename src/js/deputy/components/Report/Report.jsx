import React, { useCallback, useState, useContext, useMemo } from 'react'
import { toast } from 'react-toastify'
import Button from '../Button/Button'
import { videoLabels, channelLabels } from '@/js/config/config'
import { DomContext } from '@deputy/store/DomContext'
import { DefaultContext } from '@deputy/store/DefaultContext'
import { FLAG_ENTITIES } from '@deputy/store/reducer/constants'
import { reportEntities } from '@deputy/helpers/api'
import { wait } from '@utils/index'
import { getBrowserStorage } from '@utils/browser'
import Video from '@shared/models/Video.model'
import './report.scoped.scss'

function Report({ entities = [], modalref, onReport, searchId }) {
  const [{ user }] = useContext(DomContext)
  const [{ templates, getTemplateBySearch }, dispatch] = useContext(DefaultContext)
  const [isLoading, setIsLoading] = useState(false)
  const someChannels = useMemo(() => entities.some(e => e.type === 'channel'), [entities])
  const someVideos = useMemo(() => entities.some(e => e.type === 'video'), [entities])
  const templateBySearchId = useMemo(() => {
    if (searchId) return getTemplateBySearch(parseInt(searchId))
    return null
  }, [getTemplateBySearch, searchId])
  const [values, setValues] = useState({
    videosReason: templateBySearchId ? templateBySearchId.videosReason : '',
    channelsReason: templateBySearchId ? templateBySearchId.channelsReason : '',
    comment: templateBySearchId ? templateBySearchId.description : '',
    templateId: templateBySearchId ? templateBySearchId.id : null,
    searchId: parseInt(searchId)
  })

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault()
      const { comment, videosReason, channelsReason, templateId, searchId } = values
      const formData = new FormData()
      if (videosReason) formData.set('video_report_reason', videosReason)
      if (channelsReason) formData.set('channel_report_reason', channelsReason)
      formData.set('flag_comments', comment)
      formData.set('filters', '') // For redirection, but we don't need
      formData.set('page', '1') // For redirection, but we don't need
      formData.set('search_query', '') // For redirection, but we don't need
      formData.set('session_token', user.sessionToken)
      formData.set('video_ids', entities.map(e => e.id).join(','))

      let nbChannels = 0
      let nbVideos = 0

      for (const entity of entities) {
        if (entity.type === 'video') nbVideos++
        else if (entity.type === 'channel') nbChannels++
        formData.set(`selected_entity_${entity.id}`, entity.type)
      }

      try {
        setIsLoading(true)
        if (modalref) modalref.current.blockClose()
        await reportEntities(formData)

        const { targets } = await getBrowserStorage('local', [
          {
            key: 'targets',
            default: [],
            parser: videos => videos.map(v => new Video(v))
          }
        ])

        const newTargets = targets.filter(t => entities.every(e => e.id !== t.id))
        await wait(300)

        if (nbChannels > 0 && nbVideos > 0) {
          toast.success(
            `You have successfully flagged ${nbVideos} video${nbVideos > 1 ? 's' : ''} and ${nbChannels} channel${
              nbChannels > 1 ? 's' : ''
            }.`
          )
        } else if (nbChannels > 0) {
          toast.success(`You have successfully flagged ${nbChannels} channel${nbChannels > 1 ? 's' : ''}.`)
        } else {
          toast.success(`You have successfully flagged ${nbVideos} video${nbVideos > 1 ? 's' : ''}.`)
        }

        dispatch({
          type: FLAG_ENTITIES,
          payload: {
            nbVideos,
            nbChannels,
            templateId,
            searchId,
            newTargets
          }
        })

        onReport()
        setIsLoading(false)
        modalref.current.unBlockClose()
        if (modalref) modalref.current.close({ force: true })
      } catch (error) {
        toast.error('An unknown error has occurred')
        console.log(error)
        setIsLoading(false)
        modalref.current.unBlockClose()
      }
    },
    [entities, user.sessionToken, modalref, dispatch, onReport, values]
  )

  const handleSelectTemplate = useCallback(
    e => {
      const value = e.target.value
      if (value) {
        const template = templates.find(t => t.id === parseInt(value))
        if (template) {
          setValues(prevState => ({
            videosReason: template.videosReason,
            channelsReason: template.channelsReason,
            comment: template.description,
            templateId: template.id,
            searchId: prevState.searchId
          }))
        }
      } else {
        setValues(prevState => ({
          videosReason: '',
          channelsReason: '',
          comment: '',
          templateId: '',
          searchId: prevState.searchId
        }))
      }
    },
    [templates]
  )

  return (
    <div className="report">
      <div className="report-top">
        <h2 className="report-title">Report videos</h2>
        <select
          className="report-select-template form-element"
          onChange={handleSelectTemplate}
          defaultValue={templateBySearchId ? templateBySearchId.id : ''}
        >
          <option value="">Select template</option>
          {templates.map(template => (
            <option key={template.id} value={template.id}>
              {template.title}
            </option>
          ))}
        </select>
      </div>
      <form name="report" onSubmit={handleSubmit}>
        <p className="report-description-reason">
          Please select the category that most closely reflects your concern about the video or the channel you selected, so that
          we can review it and determine whether it violates our{' '}
          <a href="https://www.youtube.com/t/community_guidelines">Community Guidelines</a> or isn&#39;t appropriate for all
          viewers. (<span className="required-star">*</span>)
        </p>
        {someVideos && (
          <fieldset>
            {someChannels && <legend className="reason-legend">Category for videos:</legend>}
            <ul className="reason-list">
              {videoLabels.map(label => (
                <li key={label.value}>
                  <label className="report-radio-labdio">
                    <span className="report-radio">
                      <input
                        type="radio"
                        onChange={() =>
                          setValues(prevState => ({
                            ...prevState,
                            videosReason: label.value
                          }))
                        }
                        checked={label.value === values.videosReason}
                        className="report-radio-input"
                        name="videos-reason"
                        value={label.value}
                      />
                      <span className="report-radio-element"></span>
                    </span>
                    {label.title}
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
        )}
        {someChannels && (
          <fieldset>
            {someVideos && <legend className="reason-legend">Category for channels:</legend>}
            <ul className="reason-list">
              {channelLabels.map(label => (
                <li key={label.value}>
                  <label className="report-radio-labdio">
                    <span className="report-radio">
                      <input
                        type="radio"
                        onChange={() =>
                          setValues(prevState => ({
                            ...prevState,
                            channelsReason: label.value
                          }))
                        }
                        checked={label.value === values.channelsReason}
                        className="report-radio-input"
                        name="channels-reason"
                        value={label.value}
                      />
                      <span className="report-radio-element"></span>
                    </span>
                    {label.title}
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>
        )}
        <fieldset>
          <p className="report-description-comment">
            Please also provide any additional information which you think could help us verify the issue as quickly as possible:
          </p>
          <textarea
            className="comment-textarea"
            onChange={e => {
              const value = e.target.value
              setValues(prevState => ({
                ...prevState,
                comment: value
              }))
            }}
            value={values.comment}
            name="comment"
          ></textarea>
        </fieldset>
        <div className="report-bottom">
          <Button
            color="blue"
            type="submit"
            isLoading={isLoading}
            disabled={isLoading || (someVideos && !values.videosReason) || (someChannels && !values.channelsReason)}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Report
