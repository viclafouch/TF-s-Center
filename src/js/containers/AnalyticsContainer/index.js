import React from 'react'
import { YouTubeContext } from '../../main';
import TableResum from '../../components/Statistics/TableResum/TableResum';
import LastSevenDays from '../../components/Statistics/LastSevenDays/LastSevenDays';

const AnalyticsContainer = () => {
    return (
        <div className="analytics-container container-scrollable scrollBarOnHover">
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
        </div>
    )
}

export default AnalyticsContainer
