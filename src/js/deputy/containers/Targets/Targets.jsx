import React, { useCallback, useEffect, useState, useRef, useContext } from 'react'
import { useImmer } from 'use-immer'
import Tools from '@deputy/components/Tools/Tools'
import Loader from '@deputy/components/Loader/Loader'
import VideoList from '@deputy/components/VideoList/VideoList'
import Modal from '@deputy/components/Modal/Modal'
import { wait } from '@utils/index'
import Report from '@deputy/components/Report/Report'
import { getBrowserStorage, setBrowserStorage, sendMessageToBackground } from '@utils/browser'
import Video from '@shared/models/Video.model'
import { DefaultContext } from '@deputy/store/DefaultContext'
import './target.scoped.scss'

function Targets() {
  const [{ enableTargets }, dispatch] = useContext(DefaultContext)
  const [targets, setTargets] = useImmer({
    list: [],
    selected: []
  })
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const form = useRef(null)
  const modal = useRef(null)
  const unmounted = useRef(false)

  const fetchBrowserTargets = useCallback(async () => {
    try {
      setIsLoading(true)
      setIsError(false)
      await wait(300)
      if (unmounted.current) return
      const { targets } = await getBrowserStorage('local', [
        {
          key: 'targets',
          default: [],
          parser: videos => videos.map(v => new Video(v))
        }
      ])
      setTargets(draft => {
        draft.list = targets
        draft.selected = []
      })
    } catch (error) {
      setIsError(true)
      console.warn(error)
    } finally {
      if (!unmounted.current) setIsLoading(false)
    }
  }, [setTargets])

  useEffect(() => {
    fetchBrowserTargets()
    return () => {
      unmounted.current = true
    }
  }, [fetchBrowserTargets])

  const handleCheck = useCallback(
    ({ id, type }) => {
      setTargets(draft => {
        draft.selected = draft.selected.filter(s => s.id !== id)
        if (type) draft.selected.push({ type, id })
      })
    },
    [setTargets]
  )

  const handleSelectAll = useCallback(
    type => {
      setTargets(draft => {
        draft.selected = draft.list.map(v => ({
          id: v.id,
          type
        }))
      })
    },
    [setTargets]
  )

  const handleRemove = useCallback(
    id => {
      const list = [...targets.list].filter(v => v.id !== id)
      setTargets(draft => {
        draft.list = list
        draft.selected = draft.selected.filter(s => s.id !== id)
      })
      setBrowserStorage('local', { targets: list })
      sendMessageToBackground('update-nb-targets', { nbTargets: list.length })
    },
    [setTargets, targets.list]
  )

  const handleRefresh = useCallback(() => {
    setTargets(draft => {
      draft.list = []
      draft.selected = []
    })
    fetchBrowserTargets()
  }, [fetchBrowserTargets, setTargets])

  return (
    <div className="targets">
      <Modal ref={modal} fade>
        <Report entities={targets.selected} onReport={handleRefresh} />
      </Modal>
      <Tools
        isTargets
        onSubmit={handleRefresh}
        targets={targets.list.length}
        onFlag={() => modal.current.open()}
        canFlag={targets.selected.length > 0}
        handleSelectAll={handleSelectAll}
        dispatch={dispatch}
        enableTargets={enableTargets}
      />
      <div
        className={`targets-list-container ${isLoading ? 'targets-list-container-loading' : ''} ${
          !isLoading && targets.list.length === 0 ? 'targets-list-container-empty' : ''
        }`}
      >
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <p>An error occured</p>
        ) : targets.list.length === 0 ? (
          <p>{enableTargets ? 'No target' : 'The target feature is paused'}</p>
        ) : (
          <form ref={form} id="form-targets">
            <VideoList
              videos={targets.list}
              showCheckbox
              entitiesSelected={targets.selected}
              onCheck={handleCheck}
              onRemove={handleRemove}
            />
          </form>
        )}
      </div>
    </div>
  )
}

export default Targets
