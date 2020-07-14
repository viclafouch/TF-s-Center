import React, { useContext, useState } from 'react'
import { formatRelative } from 'date-fns'
import { toast } from 'react-toastify'
import { Redirect } from 'react-router'
import { DefaultContext } from '@deputy/store/DefaultContext'
import { videoLabels, channelLabels } from '@/js/config/config'
import { EDIT_TEMPLATE, REMOVE_TEMPLATE } from '@deputy/store/reducer/constants'
import Template from '@shared/models/Template.model'
import Button from '@deputy/components/Button/Button'
import './template-info.scoped.scss'

function TemplateInfo(props) {
  const [{ templates }, dispatch] = useContext(DefaultContext)
  const [template, setTemplate] = useState(() => {
    const template = templates.find(t => t.id == props.match.params.id)
    if (template) return { ...template }
    else return null
  })

  const handleRemove = () => {
    dispatch({
      type: REMOVE_TEMPLATE,
      payload: {
        templateId: template.id
      }
    })
    toast.success('The template has been removed!')
  }

  const handleUpdate = () => {
    dispatch({
      type: EDIT_TEMPLATE,
      payload: {
        template: new Template(template)
      }
    })
    toast.success('The template has been updated!')
    props.history.push('/deputy?context=templates')
  }

  if (!templates.some(t => t.id == props.match.params.id)) {
    return <Redirect to="/deputy?context=templates" />
  }

  return (
    <div className="template-info">
      <Button color="red" className="remove-button" onClick={handleRemove}>
        Remove
      </Button>
      <div className="template-edit-fields">
        <input
          className="template-title form-element"
          value={template.title}
          spellCheck="false"
          autoComplete="off"
          placeholder="Title"
          onChange={e => {
            const title = e.target.value
            setTemplate(prevState => ({
              ...prevState,
              title
            }))
          }}
        />
        <textarea
          className="template-description form-element"
          rows="5"
          onChange={e => {
            const description = e.target.value
            setTemplate(prevState => ({
              ...prevState,
              description
            }))
          }}
          defaultValue={template.description}
          placeholder="Description"
        ></textarea>
        <select
          className="form-element"
          required
          name="videos-reason"
          value={template.videosReason}
          onChange={e => {
            const videosReason = e.target.value
            setTemplate(prevState => ({
              ...prevState,
              videosReason
            }))
          }}
        >
          <option value="" disabled>
            Select the issue
          </option>
          {videoLabels.map((label, index) => (
            <option key={index} value={label.value}>
              {label.title} (videos)
            </option>
          ))}
        </select>
        <select
          className="form-element"
          required
          name="channels-reason"
          value={template.channelsReason}
          onChange={e => {
            const channelsReason = e.target.value
            setTemplate(prevState => ({
              ...prevState,
              channelsReason
            }))
          }}
        >
          <option value="" disabled>
            Select the issue
          </option>
          {channelLabels.map((label, index) => (
            <option key={index} value={label.value}>
              {label.title} (channels)
            </option>
          ))}
        </select>
        <div className="template-info-bottom">
          <Button color="blue" onClick={handleUpdate}>
            Update
          </Button>
        </div>
      </div>
      <div className="template-details">
        <p>Channels flagged with: {template.nbChannelsFlagged}</p>
        <p>Videos flagged with: {template.nbVideosFlagged}</p>
        <p className="note">Created {formatRelative(new Date(template.createdAt), new Date())}</p>
      </div>
    </div>
  )
}

export default TemplateInfo
