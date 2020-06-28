import React, { useCallback, useState, useContext, useMemo } from 'react'
import { toast } from 'react-toastify'
import Button from '../Button/Button'
import { videoLabels, channelLabels } from '@/js/config/config'
import { DomContext } from '@deputy/store/DomContext'
import { DefaultContext } from '@deputy/store/DefaultContext'
import { ADD_ENTITIES_TO_THIS_DAY } from '@deputy/store/reducer/constants'
import { reportEntities } from '@deputy/helpers/dom'
import './report.scoped.scss'
import { wait } from '@utils/index'

function Report({ entities = [], modalRef, onReport }) {
  const [{ user }] = useContext(DomContext)
  const [, dispatch] = useContext(DefaultContext)
  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState({
    videosReason: '',
    channelsReason: '',
    comment: ''
  })
  const someChannels = useMemo(() => entities.some(e => e.type === 'channel'), [entities])
  const someVideos = useMemo(() => entities.some(e => e.type === 'video'), [entities])

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault()
      const { comment, videosReason, channelsReason } = values
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
        if (modalRef) modalRef.current.blockClose()
        // await reportEntities(formData)
        await wait()

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
          type: ADD_ENTITIES_TO_THIS_DAY,
          payload: {
            nbVideos,
            nbChannels
          }
        })

        onReport()
        setIsLoading(false)
        modalRef.current.unBlockClose()
        if (modalRef) modalRef.current.close({ force: true })
      } catch (error) {
        toast.error('An unknown error has occurred')
        console.log(error)
        setIsLoading(false)
        modalRef.current.unBlockClose()
      }
    },
    [entities, user.sessionToken, modalRef, dispatch, onReport, values]
  )

  return (
    <div className="report">
      <h2>Report videos</h2>
      <form name="report" onSubmit={handleSubmit}>
        <p className="report-description-reason">
          Please select the category that most closely reflects your concern about the video or the channel you selected, so that
          we can review it and determine whether it violates our Community Guidelines or isn&#39;t appropriate for all viewers.
          (*)
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
