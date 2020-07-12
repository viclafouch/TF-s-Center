import React from 'react'
import VideoListItem from './VideoListItem'
import './video-list.scoped.scss'

function VideoList({ videos, showCheckbox = false, entitiesSelected, onCheck, onRemove }) {
  const getCheckedType = video => {
    const entity = entitiesSelected.find(e => e.id === video.id)
    if (entity) return entity.type
    return null
  }

  return (
    <ul className="video-list">
      {videos.map(video => (
        <VideoListItem
          video={video}
          key={video.uuid}
          onCheck={onCheck}
          onRemove={onRemove}
          checkedType={showCheckbox ? getCheckedType(video) : null}
          showCheckbox={showCheckbox}
        />
      ))}
    </ul>
  )
}

export default VideoList
