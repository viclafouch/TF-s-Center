import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { faVideo } from '@fortawesome/free-solid-svg-icons/faVideo'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Template from '@shared/models/Template.model'
import Button from '@deputy/components/Button/Button'
import { videoLabels, channelLabels } from '@/js/config/config'
import { DefaultContext } from '@deputy/store/DefaultContext'
import { ADD_TEMPLATE } from '@deputy/store/reducer/constants'
import { orderByDesc } from '@utils/index'
import './templates.scoped.scss'

function Templates() {
  const [{ templates }, dispatch] = useContext(DefaultContext)

  const handleAddTemplate = e => {
    e.preventDefault()
    const form = new FormData(e.target)
    const title = form.get('title')
    const videosReason = form.get('videos-reason')
    const channelsReason = form.get('channels-reason')
    const description = form.get('description')

    const template = new Template({
      title,
      videosReason,
      channelsReason,
      description
    })

    dispatch({
      type: ADD_TEMPLATE,
      payload: { template }
    })

    toast.success('The template has been created!')
    e.target.reset()
  }

  return (
    <div className="templates">
      <div className="templates-add-container">
        <h1 className="template-add-title">Create a template</h1>
        <div className="templates-add-box box-material">
          <form onSubmit={handleAddTemplate}>
            <div className="add-template-field">
              <input
                type="text"
                className="form-element"
                autoComplete="off"
                placeholder="Title"
                spellCheck="false"
                required
                name="title"
              />
            </div>
            <div className="add-template-field">
              <select className="form-element" required name="videos-reason">
                <option value="">Select the issue for the videos</option>
                {videoLabels.map((label, index) => (
                  <option key={index} value={label.value}>
                    {label.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="add-template-field">
              <select className="form-element" required name="channels-reason">
                <option value="">Select the issue for the channels</option>
                {channelLabels.map((label, index) => (
                  <option key={index} value={label.value}>
                    {label.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="add-template-field">
              <textarea name="description" className="form-element" spellCheck="false" required placeholder="Description" />
            </div>
            <Button color="blue" type="submit">
              Create
            </Button>
          </form>
        </div>
      </div>
      <div className="templates-list-container">
        <h1 className="template-list-title">Templates ({templates.length})</h1>
        <TransitionGroup component="ul">
          {orderByDesc(templates, 'createdAt').map(template => (
            <CSSTransition key={template.id} timeout={500}>
              <li className="template-item">
                <Link
                  className="box-material"
                  to={{
                    pathname: '/deputy',
                    search: `?context=templates&id=${template.id}`
                  }}
                >
                  <div className="template-item-top">
                    <h2 className="template-item-title">{template.title}</h2>
                    <div>
                      <div className="template-item-reasons">
                        <FontAwesomeIcon icon={faVideo} />
                        <span className="template-item-reason">{template.videosLabel}</span>
                      </div>
                      <div className="template-item-reasons">
                        <FontAwesomeIcon icon={faUser} />
                        <span className="template-item-reason">{template.channelsLabel}</span>
                      </div>
                    </div>
                  </div>
                  <p className="template-item-description">{template.description}</p>
                  <time className="template-item-created">{format(new Date(template.createdAt), 'MM/dd/yyyy')}</time>
                </Link>
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  )
}

export default Templates
