import React, { useCallback, useEffect, useState, useRef, useMemo, useContext } from 'react'
import { useImmer } from 'use-immer'
import Tools from '@deputy/components/Tools/Tools'
import { searchVideos, getParamsSearchVideos } from '@deputy/helpers/api'
import useQuery from '@deputy/hooks/use-query'
import Loader from '@deputy/components/Loader/Loader'
import VideoList from '@deputy/components/VideoList/VideoList'
import Modal from '@deputy/components/Modal/Modal'
import Report from '@deputy/components/Report/Report'
import searchImg from '@/img/search.svg'
import { DefaultContext } from '@deputy/store/DefaultContext'
import { ADD_LAST_SEARCH } from '@deputy/store/reducer/constants'
import './flagger.scoped.scss'

function Flagger({ history }) {
  const query = useQuery()
  const [videos, setVideos] = useImmer({
    list: [],
    selected: []
  })
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(!!query.get('search_id'))
  const [hasMore, setHasMore] = useState(false)
  const [{ searches }, dispatch] = useContext(DefaultContext)
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
  const currentParams = useRef({
    searchQuery,
    filters,
    excludeFlaggedVideos
  })

  const currentCustomSearch = useMemo(() => {
    const id = parseInt(searchId)
    if (!isNaN(id)) return searches.find(s => s.id === id)
    return null
  }, [searchId, searches])

  const fetchSearchVideos = useCallback(
    async (params, signal = new AbortController().signal) => {
      try {
        setIsLoading(true)
        const customSearch = params.currentCustomSearch
        const searchParams = getParamsSearchVideos(params)
        const response = await searchVideos(searchParams, signal)
        setHasMore(response.hasMore)
        currentParams.current = { ...params, page: params.page + 1 }
        setVideos(draft => {
          draft.list = [...draft.list, ...response.videos]
          if (customSearch && customSearch.patterns.trim() !== '') {
            const patterns = customSearch.patterns.split(',').map(p => p.toLowerCase().trim())
            for (const video of response.videos) {
              const title = video.title.toLowerCase()
              const description = video.description.toLowerCase()
              const isMatching = patterns.some(pattern => title.includes(pattern) || description.includes(pattern))
              if (isMatching) {
                draft.selected.push({
                  type: 'video',
                  id: video.id
                })
              }
            }
          }
        })
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error(error)
          setIsError(true)
        }
      } finally {
        !signal.aborted && setIsLoading(false)
      }
    },
    [setVideos]
  )

  const firstFetch = useCallback(() => {
    const controller = new AbortController()
    if (searchQuery) {
      setVideos(() => ({
        list: [],
        selected: []
      }))
      fetchSearchVideos(
        {
          page: 1,
          searchQuery: searchQuery,
          filters: filters,
          excludeFlaggedVideos: excludeFlaggedVideos,
          currentCustomSearch
        },
        controller.signal
      )
    }
    return controller
  }, [fetchSearchVideos, searchQuery, filters, excludeFlaggedVideos, currentCustomSearch, setVideos])

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

  const handleCheck = useCallback(
    ({ id, type }) => {
      setVideos(draft => {
        draft.selected = draft.selected.filter(s => s.id !== id)
        if (type) draft.selected.push({ type, id })
      })
    },
    [setVideos]
  )

  const handleSelectAll = useCallback(
    type => {
      setVideos(draft => {
        draft.selected = draft.list.map(v => ({
          id: v.id,
          type
        }))
      })
    },
    [setVideos]
  )

  return (
    <div className="flagger">
      <Modal ref={modal} fade>
        <Report entities={videos.selected} onReport={firstFetch} searchId={searchId} />
      </Modal>
      <Tools
        onSubmit={handleSubmit}
        onFlag={() => modal.current.open()}
        canFlag={videos.selected.length > 0}
        handleSelectAll={handleSelectAll}
        nbSelected={videos.selected.length}
      />
      <div
        className={`flagger-list-container ${isLoading && videos.list.length === 0 ? 'flagger-list-container-loading' : ''} ${
          !isLoading && videos.list.length === 0 ? 'flagger-list-container-empty' : ''
        }`}
        ref={scrollerRef}
        onScroll={handleScroll}
      >
        {isLoading && videos.list.length === 0 ? (
          <Loader />
        ) : (
          <form ref={form} id="form-flagger">
            <VideoList videos={videos.list} showCheckbox entitiesSelected={videos.selected} onCheck={handleCheck} />
          </form>
        )}
        {isLoading && videos.list.length > 0 && <Loader spinner />}
        {!isLoading && videos.list.length === 0 && searchQuery && <p>No result</p>}
        {!isLoading && videos.list.length === 0 && !searchQuery && (
          <div className="make-search">
            <img src={searchImg} alt="Make a search" />
            <h3>Make a search</h3>
          </div>
        )}
        {!isLoading && videos.list.length > 7 && !hasMore && <p className="no-more-result">No more result</p>}
      </div>
    </div>
  )
}

export default Flagger
