import React, { useCallback, useRef, useState, useContext } from 'react'
import { toast } from 'react-toastify'
import Button from '../Button/Button'
import { videoLabels } from '@/js/config/config'
import { serializeForm } from '@utils/index'
import { reportEntities } from '@deputy/helpers/dom'
import { DomContext } from '@deputy/store/DomContext'
import { DefaultContext } from '@deputy/store/DefaultContext'
import { ADD_ENTITIES_TO_THIS_DAY } from '@deputy/store/reducer/constants'
import './report.scoped.scss'

function Report({ entities = [], modalRef }) {
  const [{ user }] = useContext(DomContext)
  const [, dispatch] = useContext(DefaultContext)
  const reportForm = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault()
      const reportFormValues = serializeForm(reportForm.current)
      const formData = new FormData()
      formData.set('flag_comments', reportFormValues.comment)
      formData.set('video_report_reason', reportFormValues.reason)
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
        await reportEntities(formData)

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

        if (modalRef) modalRef.current.close({ force: true })
      } catch (error) {
        console.log(error)
        setIsLoading(false)
        if (modalRef) modalRef.current.unBlockClose()
      }
    },
    [entities, user.sessionToken, modalRef, dispatch]
  )

  return (
    <div className="report">
      <h2>Report videos</h2>
      <form ref={reportForm} name="report" onSubmit={handleSubmit}>
        <fieldset>
          <p className="report-description-reason">
            Please select the category that most closely reflects your concern about the video or the channel you selected, so
            that we can review it and determine whether it violates our Community Guidelines or isn&#39;t appropriate for all
            viewers.
          </p>
          <ul className="reason-list">
            {videoLabels.map(label => (
              <li key={label.value}>
                <label className="report-radio-labdio">
                  <span className="report-radio">
                    <input type="radio" className="report-radio-input" name="reason" value={label.value} />
                    <span className="report-radio-element"></span>
                  </span>
                  {label.title}
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
        <fieldset>
          <p className="report-description-comment">
            Please also provide any additional information which you think could help us verify the issue as quickly as possible:
          </p>
          <textarea className="comment-textarea" name="comment"></textarea>
        </fieldset>
        <div className="report-bottom">
          <Button color="blue" type="submit" disabled={isLoading}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Report
