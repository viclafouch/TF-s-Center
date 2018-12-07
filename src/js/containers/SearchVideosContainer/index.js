import React from 'react'
import { YouTubeContext } from '@stores/YouTubeContext';
import FormFlagging from '@components/FormFlagging/FormFlagging';

const SearchVideosContainer = ({location}) => {
  return (
    <YouTubeContext.Consumer>
      {(context) => (
        <div className="full-heigth" >
          <FormFlagging context={context} location={location} />
        </div>
      )}
    </YouTubeContext.Consumer>
  )
}

export default SearchVideosContainer
