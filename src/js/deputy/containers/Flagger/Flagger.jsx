import React, { useCallback, useEffect, useState, useRef } from 'react'
import Tools from '@deputy/components/Tools/Tools'
import { searchVideos } from '@deputy/helpers/api'
import useQuery from '@deputy/hooks/use-query'
import './flagger.scoped.scss'
import Loader from '@deputy/components/Loader/Loader'
import VideoList from '@deputy/components/VideoList/VideoList'

function Flagger({ history }) {
  const query = useQuery()
  const searchQuery = query.get('search_query')
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(!!searchQuery)
  const [isError, setIsError] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const currentParams = useRef(null)
  const scrollerRef = useRef(null)

  const fetchSearchVideos = useCallback(async params => {
    try {
      setIsLoading(true)
      const page = params.page || currentParams.current.page
      const response = await searchVideos({
        page,
        searchQuery: params.searchQuery
      })
      console.log('test')

      setHasMore(response.hasMore)
      const newParams = {
        page: page + 1,
        searchQuery: params.searchQuery
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
    if (searchQuery) {
      fetchSearchVideos({
        page: 1,
        searchQuery: searchQuery
      })
    }
  }, [fetchSearchVideos, searchQuery])

  const handleScroll = useCallback(async () => {
    const isAtBottom = scrollerRef.current.offsetHeight + scrollerRef.current.scrollTop >= scrollerRef.current.scrollHeight - 450
    if (isAtBottom && !isLoading && hasMore && !isError) {
      fetchSearchVideos(currentParams.current)
    }
  }, [fetchSearchVideos, isLoading, isError, hasMore])

  const handleSubmit = useCallback(
    ({ searchQuery }) => {
      const searchParams = new URLSearchParams({
        search_query: searchQuery
      })

      history.replace({
        pathname: '/deputy',
        search: `?${searchParams.toString()}`
      })
    },
    [history]
  )

  return (
    <div className="flagger">
      <Tools onSubmit={handleSubmit} />
      <div
        className={`flagger-list-container ${isLoading && videos.length === 0 ? 'flagger-list-container-loading' : ''} ${
          !isLoading && videos.length === 0 ? 'flagger-list-container-empty' : ''
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

export default Flagger
