import React, { useState, useContext, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck'
import { DefaultContext } from '@deputy/store/DefaultContext'
import { ADD_SEARCH, REMOVE_SEARCHES } from '@deputy/store/reducer/constants'
import Button from '@deputy/components/Button/Button'
import Search from '@shared/models/Search.model'
import { useHistory } from 'react-router'
import { getParamsSearchVideos } from '@deputy/helpers/api'
import './searches.scoped.scss'

function Searches() {
  const history = useHistory()
  const [search, setSearch] = useState(() => new Search())
  const [selectedSearches, setSelectedSearches] = useState([])
  const [{ searches, templates, getTemplate }, dispatch] = useContext(DefaultContext)

  const handleAddSearch = e => {
    e.preventDefault()
    if (search.value) {
      dispatch({
        type: ADD_SEARCH,
        payload: {
          search
        }
      })

      setSearch(new Search())
    }
  }

  const handleRemoveSearch = () => {
    dispatch({
      type: REMOVE_SEARCHES,
      payload: {
        searchesId: selectedSearches
      }
    })
    setSelectedSearches([])
  }

  const handleTestSearch = useCallback(
    searchQuery => {
      const searchParamsString = `?${getParamsSearchVideos({ searchQuery })}`
      history.push({
        pathname: '/deputy',
        search: searchParamsString
      })
    },
    [history]
  )

  const isAllChecked = searches.length === selectedSearches.length && searches.length > 0

  return (
    <div className="searches">
      <div className="searches-add-container">
        <div className="searches-add-box box-material">
          <form onSubmit={handleAddSearch}>
            <div className="top-search-action">
              <div className="input-container-search">
                <input
                  type="text"
                  className="form-element"
                  autoComplete="off"
                  placeholder="New search"
                  value={search.value}
                  spellCheck="false"
                  onChange={e => {
                    e.persist()
                    setSearch(prevState => ({
                      ...prevState,
                      value: e.target.value
                    }))
                  }}
                />
              </div>
              <Button color="blue" type="submit">
                Add
              </Button>
              <Button color="blue" onClick={() => handleTestSearch(search.value)}>
                Test
              </Button>
            </div>
            <div className="bottom-search-action">
              <select
                className="form-element"
                value={search.templateId}
                onChange={e => {
                  const templateId = parseInt(e.target.value)
                  setSearch(prevState => ({
                    ...prevState,
                    templateId
                  }))
                }}
              >
                <option value="">Choose template</option>
                {templates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.title}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
      </div>
      <div className="searches-list-container">
        <div className="box-material table-searches">
          <div className="list-actions-top">
            <h3>Vos recherches ({searches.length})</h3>
            <Button color="white" disabled={selectedSearches.length === 0} onClick={handleRemoveSearch}>
              Remove
            </Button>
          </div>
          <table className="table-material">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={isAllChecked}
                    onChange={() => setSelectedSearches(isAllChecked ? [] : searches.map(s => s.id))}
                  />
                </th>
                <th>#</th>
                <th>Value</th>
                <th>Template</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {searches.map((search, index) => (
                <tr key={search.id}>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectedSearches.some(s => s === search.id)}
                      onChange={() =>
                        setSelectedSearches(prevState => {
                          let prevStateSearches = [...prevState]
                          if (prevState.some(s => s === search.id)) {
                            prevStateSearches = prevStateSearches.filter(s => s !== search.id)
                          } else {
                            prevStateSearches.push(search.id)
                          }
                          return prevStateSearches
                        })
                      }
                    />
                  </th>
                  <th scope="row">{index}</th>
                  <td>{search.value}</td>
                  <td>
                    {search.templateId && templates.some(t => t.id === search.templateId)
                      ? getTemplate(search.templateId).title
                      : ''}
                  </td>
                  <td>
                    <Link
                      to={{
                        pathname: '/deputy',
                        search: `?${getParamsSearchVideos({
                          searchId: search.id,
                          searchQuery: search.value,
                          excludeFlaggedVideos: true,
                          filters: 'anytime'
                        })}`
                      }}
                    >
                      <Button color="white" tabIndex="-1">
                        Go
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Searches
