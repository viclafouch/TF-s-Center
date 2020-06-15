import React, { useState, useEffect, useCallback, useRef } from 'react'
import { getVideosHistory } from '@deputy/helpers/api'
import VideoList from '@deputy/components/VideoList/VideoList'
import Tools from '@deputy/components/Tools/Tools'
import Loader from '@deputy/components/Loader/Loader'
import useQuery from '@deputy/hooks/use-query'
import './history.scoped.scss'

function History({ history }) {
  const query = useQuery()
  const startTime = query.get('start_time')
  const endTime = query.get('end_time')
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
      startTime: startTime || null,
      endTime: endTime || null
    })
  }, [fetchHistory, startTime, endTime])

  const handleScroll = useCallback(async () => {
    const isAtBottom = scrollerRef.current.offsetHeight + scrollerRef.current.scrollTop >= scrollerRef.current.scrollHeight - 450
    if (isAtBottom && !isLoading && hasMore && !isError) {
      fetchHistory(currentParams.current)
    }
  }, [fetchHistory, isLoading, isError, hasMore])

  const handleSubmit = useCallback(
    ({ startTime, endTime }) => {
      const searchParams = new URLSearchParams({
        start_time: startTime,
        end_time: endTime
      })

      history.replace({
        pathname: '/flagging_history',
        search: `?${searchParams.toString()}`
      })
    },
    [history]
  )

  return (
    <div className="history">
      <Tools isHistory onSubmit={handleSubmit} />
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
        {!isLoading && videos.length > 0 && !hasMore && <p className="no-more-result">No more result</p>}
      </div>
    </div>
  )
}

export default History
