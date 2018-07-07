import React from 'react'
import Button from '../../Button';

const Pagination = ({pages}) => {
    return (
        <React.Fragment>
            {
                pages.length !== 0 &&
                    <div className="tools-pagination">
                        {
                            pages.map((elem, index) =>
                                <a href={elem.url} className="mgi--right-4" key={index}>
                                    <Button blue className={elem.isActual ? 'active' : ''}>
                                        {elem.isNext ? 'Next' : elem.isPrev ? 'Prev' : elem.numPage}
                                    </Button>
                                </a>
                            )
                        }
                    </div>
            }
        </React.Fragment>
    )
}

export default Pagination
