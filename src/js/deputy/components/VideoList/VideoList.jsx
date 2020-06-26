import React from 'react'
import VideoListItem from './VideoListItem'
import './video-list.scoped.scss'

function VideoList({ videos, showCheckbox = false }) {
  return (
    <ul className="video-list">
      {videos.map(video => (
        <VideoListItem video={video} key={video.uuid} showCheckbox={showCheckbox} />
      ))}
    </ul>
  )
}

export default VideoList
