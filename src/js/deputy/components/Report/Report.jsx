import React, { useCallback, useRef } from 'react'
import { videoLabels } from '@/js/config/config'
import Button from '../Button/Button'
import { serializeForm } from '@utils/index'
import { withDomContext } from '@deputy/store/DomContext'
import { reportEntities } from '@deputy/helpers/dom'
import './report.scoped.scss'

function Report({ entities = [], domContext }) {
  const reportForm = useRef(null)

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
      formData.set('session_token', domContext.user.sessionToken)
      formData.set('video_ids', Object.keys(entities).join(','))

      for (const id in entities) {
        const type = entities[id]
        formData.set(`selected_entity_${id}`, type)
      }

      try {
        await reportEntities(formData)
        console.log('success')
      } catch (error) {
        console.log(error)
      }
    },
    [entities, domContext.user.sessionToken]
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
          <Button color="blue" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  )
}

export default withDomContext(Report)
