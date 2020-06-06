import React from 'react'
import Button from '@components/Button'
import { NavLink } from 'react-router-dom'

const Pagination = ({ pages }) => (
  <>
    {pages.length !== 0 && (
      <div className="tools-pagination">
        {pages.map((elem, index) => (
          <NavLink
            key={index}
            to={elem.url}
            className="mgi--right-4"
            activeClassName="active"
          >
            <Button blue className={elem.isActual ? 'active' : ''}>
              {elem.isNext ? 'Next' : elem.isPrev ? 'Prev' : elem.numPage}
            </Button>
          </NavLink>
        ))}
      </div>
    )}
  </>
)

export default Pagination
