import React, { Component } from 'react'
import { NewSearches } from '../../components/Searches/New/NewSearches';
import { ListSearches } from '../../components/Searches/List/ListSearches';
import { YouTubeContext } from '../../main';

export class SearchesContainer extends Component {
    render() {
        return (
            <div className="searches-container scrollBarOnHover">
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
                               { context.state.searches.length > 0 && <ListSearches /> }
                            </React.Fragment>
                        )}
                    </YouTubeContext.Consumer>
                </div>
            </div>
        )
    }
}

export default SearchesContainer
