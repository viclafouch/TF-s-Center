import React from 'react'
import { YouTubeContext } from '@stores/YouTubeContext';
import ToolsFlag from '@components/ToolsFlag/ToolsFlag';
import VideosList from '@components/VideosList/VideosList';

const HistoryContainer = () => {
  return (
    <YouTubeContext.Consumer>
      {(context) => (
        <div className="full-heigth" >
          <ToolsFlag />
          <VideosList videos={context.state.videosDisplayed} />
        </div>
      )}
    </YouTubeContext.Consumer>
  )
}

export default HistoryContainer
