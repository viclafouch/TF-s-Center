import React, { Component } from 'react'
import { NewSearches } from '../../components/Searches/New/NewSearches';

export class SearchesContainer extends Component {
    render() {
        return (
            <div className="searches-container scrollBarOnHover">
                <div className="pdi--10">
                    <NewSearches />
                </div>
                {/* <div className="pdi--10">
                    <ListTemplates />
                </div> */}
            </div>
        )
    }
}

export default SearchesContainer
