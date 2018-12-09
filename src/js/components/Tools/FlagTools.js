import React from 'react'
import Button from '../Button'
import CountVideos from './CountVideos/CountVideos';
import { FilterPeriod } from './FilterPeriod/FilterPeriod';
import { ExcludeFlagged } from './ExcludeFlagged/ExcludeFlagged';
import { SelectDisplay } from './SelectDisplay/SelectDisplay';

const FlagTools = (context) => {
  return (
    <div className="flex-me flex-justify-between flex-align">
      <div className="flex-me">
        <div className="mgi--right-10">
          <Button
            blue
            disabled={!context.state.videosDisplayed.filter(x => x.selected).length}
            onClick={() => context.openModal('form-flagging')}
          >Flag selected videos</Button>
        </div>
          <div className="mgi--right-10">
            <FilterPeriod disabled={context.state.onToFlag} />
          </div>
          <div className="mgi--right-10">
            <ExcludeFlagged disabled={context.state.onToFlag}/>
          </div>
          <div className="mgi--right-10">
            <SelectDisplay />
          </div>
      </div>
      <CountVideos {...context} canFlag={context.canFlag} />
    </div>
  )
}

export default FlagTools
