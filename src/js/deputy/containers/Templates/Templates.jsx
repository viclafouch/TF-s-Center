import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus'
import Template from '@shared/models/Template.model'
import Button from '@deputy/components/Button/Button'
import { labels } from '@/js/config/config'
import { DefaultContext } from '@deputy/store/DefaultContext'
import { ADD_TEMPLATE } from '@deputy/store/reducer/constants'
import './template.scoped.scss'

function Templates() {
  const [isExpended, setIsExpended] = useState(false)
  const [{ templates }, dispatch] = useContext(DefaultContext)
  const addContainerRef = useRef(null)

  const handleAddTemplate = (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const title = form.get('title')
    const reason = form.get('reason')
    const description = form.get('description')

    const template = new Template({
      title,
      reason,
      description,
    })

    dispatch({
      type: ADD_TEMPLATE,
      payload: { template },
    })

    setIsExpended(false)
  }

  const handleClickOutside = useCallback((e) => {
    if (!addContainerRef.current.contains(e.target)) setIsExpended(false)
  }, [])

  useEffect(() => {
    if (isExpended) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isExpended, handleClickOutside])

  return (
    <div className="templates">
      <div className="templates-add-container" ref={addContainerRef}>
        <div
          className="templates-add-box box-material"
          onClick={() => (isExpended ? null : setIsExpended(true))}
        >
          {!isExpended ? (
            <div className="add-placeholder">
              <p>Add template</p>
              <FontAwesomeIcon icon={faPlus} size="1x" fixedWidth />
            </div>
          ) : (
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
                <select className="form-element" required name="reason">
                  <option value="">Select the issue</option>
                  {labels.map((label, index) => (
                    <option key={index} value={label.value}>
                      {label.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="add-template-field">
                <textarea
                  name="description"
                  className="form-element"
                  spellCheck="false"
                  required
                  placeholder="Description"
                />
              </div>
              <Button color="blue" type="submit">
                Create
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Templates
