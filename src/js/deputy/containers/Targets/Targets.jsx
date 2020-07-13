import React, { useCallback, useEffect, useState, useRef, useContext } from 'react'
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
  const [videos, setVideos] = useState([])
  const [isError, setIsError] = useState(false)
  const [entitiesSelected, setEntitiesSelected] = useState([])
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
      const videos = await getBrowserStorage('local', [
        {
          key: 'targets',
          default: [],
          parser: videos => videos.map(v => new Video(v))
        }
      ]).then(({ targets }) => targets)
      setVideos(videos)
    } catch (error) {
      setIsError(true)
      console.warn(error)
    } finally {
      if (!unmounted.current) setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBrowserTargets()
    return () => {
      unmounted.current = true
    }
  }, [fetchBrowserTargets])

  const handleCheck = useCallback(({ id, type }) => {
    setEntitiesSelected(prevState => {
      const entities = prevState.filter(e => e.id !== id)
      if (type) entities.push({ type, id })
      return entities
    })
  }, [])

  const handleSelectAll = useCallback(
    type => {
      setEntitiesSelected(
        videos.map(v => ({
          id: v.id,
          type
        }))
      )
    },
    [videos]
  )

  const handleRemove = useCallback(
    id => {
      const newVideos = [...videos].filter(v => v.id !== id)
      setVideos(newVideos)
      setEntitiesSelected(newVideos)
      setBrowserStorage('local', { targets: newVideos })
      sendMessageToBackground('update-nb-targets', { nbTargets: newVideos.length })
    },
    [videos]
  )

  const handleRefresh = useCallback(() => {
    setEntitiesSelected([])
    fetchBrowserTargets()
  }, [fetchBrowserTargets])

  return (
    <div className="targets">
      <Modal ref={modal} fade>
        <Report entities={entitiesSelected} onReport={handleRefresh} />
      </Modal>
      <Tools
        isTargets
        onSubmit={handleRefresh}
        targets={videos.length}
        onFlag={() => modal.current.open()}
        canFlag={entitiesSelected.length > 0}
        handleSelectAll={handleSelectAll}
        dispatch={dispatch}
        enableTargets={enableTargets}
      />
      <div
        className={`targets-list-container ${isLoading ? 'targets-list-container-loading' : ''} ${
          !isLoading && videos.length === 0 ? 'targets-list-container-empty' : ''
        }`}
      >
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <p>An error occured</p>
        ) : videos.length === 0 ? (
          <p>{enableTargets ? 'No target' : 'The target feature is paused'}</p>
        ) : (
          <form ref={form} id="form-targets">
            <VideoList
              videos={videos}
              showCheckbox
              entitiesSelected={entitiesSelected}
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
