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
      setVideos(prevState => [...prevState, ...response.videos])
      const newParams = {
        page: page + 1,
        startTime: params.startTime,
        endTime: params.endTime,
        hasMore: response.hasMore
      }
      currentParams.current = newParams
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
      endTime: new URLSearchParams(props.location.search).get('end_time') || null,
      hasMore: true
    })
  }, [fetchHistory, props.location])

  const handleScroll = useCallback(async () => {
    const isAtBottom = scrollerRef.current.offsetHeight + scrollerRef.current.scrollTop >= scrollerRef.current.scrollHeight - 450
    if (isAtBottom && !isLoading && currentParams.current.hasMore && !isError) {
      fetchHistory(currentParams.current)
    }
  }, [fetchHistory, isLoading, isError])

  return (
    <div className="history">
      <Tools isHistory />
      <div
        className={`history-list-container ${isLoading && videos.length === 0 ? 'history-list-container-loading' : ''}`}
        ref={scrollerRef}
        onScroll={handleScroll}
      >
        {isLoading && videos.length === 0 ? <Loader /> : <VideoList videos={videos} />}
        {isLoading && videos.length > 0 && <Loader spinner />}
      </div>
    </div>
  )
}

export default History
