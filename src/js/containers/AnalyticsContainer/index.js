import React from 'react'
import { YouTubeContext } from '../../main';
import TableResum from '../../components/Statistics/TableResum/TableResum';
import LastSevenDays from '../../components/Statistics/LastSevenDays/LastSevenDays';
import BestTemplates from '../../components/Statistics/BestTemplates/BestTemplates';

const AnalyticsContainer = () => {
    return (
        <div className="analytics-container pdi--10 container-scrollable scrollBarOnHover">
            <div className="mgi--top-10">
                <TableResum />
            </div>
            <div className="mgi--10">
                <YouTubeContext.Consumer>
                    {(context) => (
                        <LastSevenDays context={context} />
                    )}
                </YouTubeContext.Consumer>
            </div>
            <div className="mgi--20">
                <div className="row">
                    <div className="column one-half box-material">
                        <h2 className="center-text mgi--bottom-10">Templates sort by videos flagged</h2>
                        <YouTubeContext.Consumer>
                            {(context) => (
                                <BestTemplates context={context} />
                            )}
                        </YouTubeContext.Consumer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnalyticsContainer
