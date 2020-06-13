import React, { useContext } from 'react'
import { formatDistance } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import { faFlag } from '@fortawesome/free-solid-svg-icons/faFlag'
import { DefaultContext } from '@deputy/store/DefaultContext'
import './history.scoped.scss'

function History() {
  const [{ videosHistory }] = useContext(DefaultContext)
  console.log(videosHistory)

  return (
    <div className="history">
      <div className="history-list-container">
        <ul className="video-list">
          {videosHistory.map(video => {
            const thumbnail = video.thumbnail('default')
            const isRemoved = !!video.removedAt
            const isReviewed = !!video.reviewedAt
            return (
              <li
                key={video.id}
                className={`video-item ${isRemoved ? 'video-removed' : ''} ${isReviewed ? 'video-reviewed' : ''}`}
              >
                <div className="video-thumbnail">
                  <a href={video.url}>
                    <img src={thumbnail.url} alt={video.title} lazy="loading" width={thumbnail.width} height={thumbnail.height} />
                  </a>
                </div>
                <div className="video-content">
                  <h3 className="video-title">
                    <a href={video.url}>{isRemoved ? 'This video is not longer avalaible' : video.title}</a>
                  </h3>
                  <div className="video-summary">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: video.summary
                      }}
                    />
                  </div>
                  {!isRemoved && (
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
                  {video.removedAt && (
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
                      {formatDistance(new Date(video.reviewedAt), new Date(), {
                        addSuffix: true
                      })}
                    </span>
                  )}
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
