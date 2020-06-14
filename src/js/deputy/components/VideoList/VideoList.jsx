import React from 'react'
import VideoListItem from './VideoListItem'
import { randomId } from '@utils/index'
import './video-list.scoped.scss'

function VideoList({ videos }) {
  return (
    <ul className="video-list">
      {videos.map(video => (
        <VideoListItem {...video} key={randomId()} />
      ))}
    </ul>
  )
}

export default VideoList
