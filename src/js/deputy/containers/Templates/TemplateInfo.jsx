import React, { useContext, useState, useEffect } from 'react'
import { DefaultContext } from '@deputy/store/DefaultContext'
import { Redirect } from 'react-router'
import { labels, links } from '@/js/config/config'
import { EDIT_TEMPLATE, REMOVE_TEMPLATE } from '@deputy/store/reducer/constants'
import Template from '@shared/models/Template.model'
import Button from '@deputy/components/Button/Button'
import './template-info.scoped.scss'

const templatesPath = links[1]

function TemplateInfo(props) {
  const [{ templates }, dispatch] = useContext(DefaultContext)
  const [template, setTemplate] = useState(() => {
    const template = templates.find(t => t.id == props.match.params.id)
    if (template) return { ...template }
    else return null
  })

  useEffect(() => {
    if (template) {
      dispatch({
        type: EDIT_TEMPLATE,
        payload: {
          template: new Template(template)
        }
      })
    }
  }, [template, dispatch])

  if (!templates.some(t => t.id == props.match.params.id)) {
    return <Redirect to={templatesPath.href} />
  }

  return (
    <div className="template-info">
      <Button
        color="red"
        className="remove-button"
        onClick={() => {
          dispatch({
            type: REMOVE_TEMPLATE,
            payload: {
              templateId: template.id
            }
          })
        }}
      >
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
          name="reason"
          value={template.reason}
          onChange={e => {
            const reason = e.target.value
            setTemplate(prevState => ({
              ...prevState,
              reason
            }))
          }}
        >
          <option value="" disabled>
            Select the issue
          </option>
          {labels.map((label, index) => (
            <option key={index} value={label.value}>
              {label.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default TemplateInfo
