import React from 'react'
import NewTemplate from '../../components/Template/New/NewTemplate';
import { ListTemplates } from '../../components/Template/List/ListTemplates';
import { YouTubeContext } from '../../main';

const TemplatesContainer = () => {
    return (
        <div className="template-container scrollBarOnHover">
            <div className="pdi--10">
                <YouTubeContext.Consumer>
                    {(context) => (
                        <NewTemplate context={context} />
                    )}
                </YouTubeContext.Consumer>
            </div>
            <div className="pdi--10">
                <ListTemplates />
            </div>
        </div>
    )
}

export default TemplatesContainer
