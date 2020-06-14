import React, { useState, useEffect, useCallback, useRef } from 'react'
import { formatDistance } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import { faFlag } from '@fortawesome/free-solid-svg-icons/faFlag'
import { faHashtag } from '@fortawesome/free-solid-svg-icons/faHashtag'
import './history.scoped.scss'
import { getVideosHistory } from '@deputy/helpers/api'
import { randomId } from '@utils/index'
import { isValidDate } from '@utils/date'

function History(props) {
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const currentParams = useRef({
    page: 3,
    startTime: new URLSearchParams(props.location.search).get('start_time') || null,
    endTime: new URLSearchParams(props.location.search).get('end_time') || null,
    hasMore: true
  })
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
    fetchHistory(currentParams.current)
  }, [fetchHistory])

  const handleScroll = useCallback(async () => {
    const isAtBottom = scrollerRef.current.offsetHeight + scrollerRef.current.scrollTop >= scrollerRef.current.scrollHeight - 450
    console.log(currentParams.current.hasMore)
    if (isAtBottom && !isLoading && currentParams.current.hasMore && !isError) {
      fetchHistory(currentParams.current)
    }
  }, [fetchHistory, isLoading, isError])

  console.log(videos)

  return (
    <div className="history">
      <div className="tools">Hello</div>
      <div className="history-list-container" ref={scrollerRef} onScroll={handleScroll}>
        <ul className="video-list">
          {videos.map(video => {
            const thumbnail = video.thumbnail('default')
            const isRemoved = !!video.removedAt
            const isReviewed = !!video.reviewedAt
            return (
              <li
                key={randomId()}
                className={`video-item ${isRemoved ? 'video-removed' : ''} ${isReviewed ? 'video-reviewed' : ''}`}
              >
                <div className="video-thumbnail">
                  <a href={video.url}>
                    <img src={thumbnail.url} alt={video.title} lazy="loading" width={thumbnail.width} height={thumbnail.height} />
                  </a>
                </div>
                <div className="video-content">
                  <h3 className="video-title">
                    <a href={video.url}>{!video.isValidReviewedAt ? 'This video is not longer avalaible' : video.title}</a>
                  </h3>
                  <div className="video-summary">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: video.summary
                      }}
                    />
                  </div>
                  {video.isValidReviewedAt && (
                    <p className="video-notes">
                      <a className="video-channel" href={video.channel.url} target="_blank" rel="noreferrer">
                        {video.channel.name}
                      </a>
                      {' | '}
                      <span className="video-created">{video.createdAt}</span>
                      {' | '}
                      <span>{video.nbViews} views</span>
                    </p>
                  )}
                </div>
                <div className="video-actions">
                  {isRemoved && (
                    <span className="video-status video-is-removed">
                      <FontAwesomeIcon icon={faTrash} size="1x" fixedWidth />{' '}
                      {formatDistance(new Date(video.removedAt), new Date(), {
                        addSuffix: true
                      })}
                    </span>
                  )}
                  {video.reviewedAt && (
                    <span className="video-status video-is-reviewed">
                      <FontAwesomeIcon icon={faFlag} size="1x" fixedWidth />{' '}
                      {video.isValidReviewedAt
                        ? formatDistance(new Date(video.reviewedAt), new Date(), {
                            addSuffix: true
                          })
                        : 'Arleady examined'}
                    </span>
                  )}
                  <span className="video-id">
                    <FontAwesomeIcon icon={faHashtag} size="1x" fixedWidth />
                    {video.id}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default History
