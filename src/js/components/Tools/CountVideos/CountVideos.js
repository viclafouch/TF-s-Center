import React from 'react'

const CountVideos = (context) => {
  const videoToCount = context.state.videosDisplayed.filter(x => !context.canFlag ? x.isRemoved : x.selected);

  return (
      <div className="box-count-videos">
        <span className={!context.canFlag && videoToCount.length > 0 ? 'red-color' : ''}>
        {videoToCount.length}</span>
        {' / '}
        {context.state.videosDisplayed.length}
      </div>
  )
}

export default CountVideos
