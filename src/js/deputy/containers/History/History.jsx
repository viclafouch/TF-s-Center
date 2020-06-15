import React, { useState, useEffect, useCallback, useRef } from 'react'
import './history.scoped.scss'
import { getVideosHistory } from '@deputy/helpers/api'
import VideoList from '@deputy/components/VideoList/VideoList'
import Tools from '@deputy/components/Tools/Tools'
import Loader from '@deputy/components/Loader/Loader'

function History(props) {
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const currentParams = useRef(null)
  const scrollerRef = useRef(null)

  const fetchHistory = useCallback(async params => {
    try {
      setIsLoading(true)
      const page = params.page || currentParams.current.page
      const response = await getVideosHistory({
        page,
        startTime: params.startTime,
        endTime: params.endTime
      })
      setHasMore(response.hasMore)
      const newParams = {
        page: page + 1,
        startTime: params.startTime,
        endTime: params.endTime
      }
      currentParams.current = newParams
      setVideos(prevState => [...prevState, ...response.videos])
    } catch (error) {
      console.error(error)
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    setVideos([])
    fetchHistory({
      page: 1,
      startTime: new URLSearchParams(props.location.search).get('start_time') || null,
      endTime: new URLSearchParams(props.location.search).get('end_time') || null
    })
  }, [fetchHistory, props.location])

  const handleScroll = useCallback(async () => {
    const isAtBottom = scrollerRef.current.offsetHeight + scrollerRef.current.scrollTop >= scrollerRef.current.scrollHeight - 450
    if (isAtBottom && !isLoading && hasMore && !isError) {
      fetchHistory(currentParams.current)
    }
  }, [fetchHistory, isLoading, isError, hasMore])

  return (
    <div className="history">
      <Tools isHistory />
      <div
        className={`history-list-container ${isLoading && videos.length === 0 ? 'history-list-container-loading' : ''} ${
          !isLoading && videos.length === 0 ? 'history-list-container-empty' : ''
        }`}
        ref={scrollerRef}
        onScroll={handleScroll}
      >
        {isLoading && videos.length === 0 ? <Loader /> : <VideoList videos={videos} />}
        {isLoading && videos.length > 0 && <Loader spinner />}
        {!isLoading && videos.length === 0 && <p>No result</p>}
        {!isLoading && videos.length > 0 && !hasMore && <p>No more result</p>}
      </div>
    </div>
  )
}

export default History
