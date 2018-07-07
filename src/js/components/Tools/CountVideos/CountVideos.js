import React from 'react'

const CountVideos = (context) => {

    let videosSelected = context.state.videosDisplayed.filter(x => x.selected === true);
    let videosRemoved = context.state.videosDisplayed.filter(x => x.isRemoved === true);

    return (
        <div className="box-count-videos">
            <span className={!context.state.canFlag && videosRemoved.length > 0 ? 'red-color' : ''}>
            {context.state.canFlag ? videosSelected.length : videosRemoved.length}</span>
            {' / '}
            {context.state.videosDisplayed.length}
        </div>
    )
}

export default CountVideos
