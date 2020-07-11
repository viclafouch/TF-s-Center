import React, { useCallback, useEffect, useState, useRef, useMemo, useContext } from 'react'
import Tools from '@deputy/components/Tools/Tools'
import { searchVideos, getParamsSearchVideos } from '@deputy/helpers/api'
import useQuery from '@deputy/hooks/use-query'
import Loader from '@deputy/components/Loader/Loader'
import VideoList from '@deputy/components/VideoList/VideoList'
import Modal from '@deputy/components/Modal/Modal'
import { serializeForm } from '@utils/index'
import Report from '@deputy/components/Report/Report'
import searchImg from '@/img/search.svg'
import { DefaultContext } from '@deputy/store/DefaultContext'
import { ADD_LAST_SEARCH } from '@deputy/store/reducer/constants'
import './flagger.scoped.scss'

function Flagger({ history }) {
  const query = useQuery()
  const [videos, setVideos] = useState([])
  const [isError, setIsError] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [entitiesSelected, setEntitiesSelected] = useState([])
  const currentParams = useRef({
    searchQuery,
    filters,
    excludeFlaggedVideos
  })
  const [, dispatch] = useContext(DefaultContext)
  const scrollerRef = useRef(null)
  const form = useRef(null)
  const modal = useRef(null)
  const { filters, searchQuery, excludeFlaggedVideos, searchId } = useMemo(
    () => ({
      filters: query.get('filters'),
      searchQuery: query.get('search_query'),
      excludeFlaggedVideos: query.get('exclude_flagged_videos'),
      searchId: query.get('search_id')
    }),
    [query]
  )
  const [isLoading, setIsLoading] = useState(!!searchQuery)

  const fetchSearchVideos = useCallback(async (params, signal = new AbortController().signal) => {
    try {
      setIsLoading(true)
      const searchParams = getParamsSearchVideos(params)
      const response = await searchVideos(searchParams, signal)
      setHasMore(response.hasMore)
      currentParams.current = { ...params, page: params.page + 1 }
      setVideos(prevState => [...prevState, ...response.videos])
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error(error)
        setIsError(true)
      }
    } finally {
      !signal.aborted && setIsLoading(false)
    }
  }, [])

  const firstFetch = useCallback(() => {
    const controller = new AbortController()
    if (searchQuery) {
      setVideos([])
      setEntitiesSelected([])
      fetchSearchVideos(
        {
          page: 1,
          searchQuery: searchQuery,
          filters: filters,
          excludeFlaggedVideos: excludeFlaggedVideos
        },
        controller.signal
      )
    }
    return controller
  }, [fetchSearchVideos, searchQuery, filters, excludeFlaggedVideos])

  useEffect(() => {
    if (query.get('search_query')) {
      dispatch({
        type: ADD_LAST_SEARCH,
        payload: {
          lastSearchValue: query.toString()
        }
      })
    }
  }, [query, dispatch])

  useEffect(() => {
    const controller = firstFetch()
    return () => {
      controller.abort()
    }
  }, [firstFetch])

  const handleScroll = useCallback(async () => {
    const isAtBottom = scrollerRef.current.offsetHeight + scrollerRef.current.scrollTop >= scrollerRef.current.scrollHeight - 450
    if (isAtBottom && !isLoading && hasMore && !isError) {
      fetchSearchVideos(currentParams.current)
    }
  }, [fetchSearchVideos, isLoading, isError, hasMore])

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

  const handleSubmit = useCallback(
    (...params) => {
      const searchParamsString = `?${getParamsSearchVideos(...params)}`
      history.replace({
        pathname: '/deputy',
        search: searchParamsString
      })
    },
    [history]
  )

  const handleCheck = useCallback(({ id, type }) => {
    setEntitiesSelected(prevState => {
      const entities = prevState.filter(e => e.id !== id)
      if (type) entities.push({ type, id })
      return entities
    })
  }, [])

  return (
    <div className="flagger">
      <Modal ref={modal} fade>
        <Report entities={entitiesSelected} onReport={firstFetch} searchId={searchId} />
      </Modal>
      <Tools
        onSubmit={handleSubmit}
        onFlag={() => modal.current.open()}
        canFlag={entitiesSelected.length > 0}
        handleSelectAll={handleSelectAll}
      />
      <div
        className={`flagger-list-container ${isLoading && videos.length === 0 ? 'flagger-list-container-loading' : ''} ${
          !isLoading && videos.length === 0 ? 'flagger-list-container-empty' : ''
        }`}
        ref={scrollerRef}
        onScroll={handleScroll}
      >
        {isLoading && videos.length === 0 ? (
          <Loader />
        ) : (
          <form ref={form} id="form-flagger">
            <VideoList videos={videos} showCheckbox entitiesSelected={entitiesSelected} onCheck={handleCheck} />
          </form>
        )}
        {isLoading && videos.length > 0 && <Loader spinner />}
        {!isLoading && videos.length === 0 && searchQuery && <p>No result</p>}
        {!isLoading && videos.length === 0 && !searchQuery && (
          <div className="make-search">
            <img src={searchImg} alt="Make a search" />
            <h3>Make a search</h3>
          </div>
        )}
        {!isLoading && videos.length > 7 && !hasMore && <p className="no-more-result">No more result</p>}
      </div>
    </div>
  )
}

export default Flagger
