import React from 'react'
import NewSearches from '@components/Searches/New/NewSearches';
import ListSearches from '@components/Searches/List/ListSearches';
import { YouTubeContext } from '@stores/YouTubeContext';

const SearchesContainer = () => {
    return (
      <div className="full-heigth main-body">
        <div className="searches-container container-scrollable scrollBarOnHover">
            <div className="pdi--10">
                <YouTubeContext.Consumer>
                    {(context) => (
                        <NewSearches context={context} />
                    )}
                </YouTubeContext.Consumer>
            </div>
            <div className="pdi--10">
                <YouTubeContext.Consumer>
                    {(context) => (
                        <React.Fragment>
                            {context.state.searches.length > 0 && <ListSearches />}
                        </React.Fragment>
                    )}
                </YouTubeContext.Consumer>
            </div>
        </div>
      </div>
    )
}

export default SearchesContainer