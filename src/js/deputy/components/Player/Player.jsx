import React from 'react'
import './player.scoped.scss'

function Player({ video }) {
  return (
    <div className="player">
      <div className="player-video">
        <iframe
          src={`https://www.youtube.com/embed/${video.id}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <h1 className="player-title">{video.title}</h1>
      <div className="player-description">
        <p
          dangerouslySetInnerHTML={{
            __html: video.description
          }}
        />
      </div>
    </div>
  )
}

export default Player
