import React from 'react'
import { YouTubeContext } from '@stores/YouTubeContext';
import ToolsFlag from '@components/ToolsFlag/ToolsFlag';
import VideosList from '@components/VideosList/VideosList';

const HistoryContainer = () => {
  return (
    <div className="full-heigth" >
      <ToolsFlag />
      <YouTubeContext.Consumer>
        {(context) => (
          <VideosList videos={context.state.videosDisplayed} />
        )}
      </YouTubeContext.Consumer>
    </div>
  )
}

export default HistoryContainer
