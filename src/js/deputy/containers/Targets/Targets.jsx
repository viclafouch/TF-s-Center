import React, { useCallback, useEffect, useState, useRef } from 'react'
import Tools from '@deputy/components/Tools/Tools'
import Loader from '@deputy/components/Loader/Loader'
import VideoList from '@deputy/components/VideoList/VideoList'
import Modal from '@deputy/components/Modal/Modal'
import { serializeForm } from '@utils/index'
import Report from '@deputy/components/Report/Report'
import { getBrowserStorage } from '@utils/browser'
import Video from '@shared/models/Video.model'
import './target.scoped.scss'

function Targets() {
  const [videos, setVideos] = useState([])
  const [isError, setIsError] = useState(false)
  const [entitiesSelected, setEntitiesSelected] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const form = useRef(null)
  const modal = useRef(null)

  const fetchBrowserTargets = useCallback(async () => {
    try {
      setIsLoading(true)
      setIsError(false)
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
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBrowserTargets()
  }, [fetchBrowserTargets])

  const handleCheck = useCallback(() => {
    const selected = Object.keys(serializeForm(form.current)).map(key => {
      const type = key.startsWith('video-') ? 'video' : 'channel'
      const id = type === 'video' ? key.split('video-')[1] : key.split('channel-')[1]
      return {
        id,
        type
      }
    })
    setEntitiesSelected(selected)
  }, [])

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
      />
      <div
        className={`targets-list-container ${isLoading && videos.length === 0 ? 'targets-list-container-loading' : ''} ${
          !isLoading && videos.length === 0 ? 'targets-list-container-empty' : ''
        }`}
      >
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <p>An error occured</p>
        ) : videos.length === 0 ? (
          <p>No target</p>
        ) : (
          <form ref={form} id="form-targets" onChange={handleCheck}>
            <VideoList videos={videos} showCheckbox />
          </form>
        )}
      </div>
    </div>
  )
}

export default Targets
