import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaste } from '@fortawesome/free-solid-svg-icons/faPaste'
import { faSearchengin } from '@fortawesome/free-brands-svg-icons/faSearchengin'
import { faBullseye } from '@fortawesome/free-solid-svg-icons/faBullseye'
import { DefaultContext } from '@deputy/store/DefaultContext'
import './home.scoped.scss'

function Home() {
  const [{ templates, searches }] = useContext(DefaultContext)
  return (
    <div className="home">
      <div className="header-home">
        <h1 className="title-box">Dashboard</h1>
      </div>
      <div className="container-box">
        <div className="big-box box-material">
          <h4 className="title-box">Hello</h4>
        </div>
        <div className="mini-box box-material">
          <div className="icon-box icon-mini-box">
            <FontAwesomeIcon icon={faBullseye} size="2x" fixedWidth />
          </div>
          <div className="detail-box detail-mini-box">
            <h4 className="title-box">
              <span className="number-box">67</span> targets
            </h4>
          </div>
        </div>
        <div className="mini-box box-material">
          <div className="icon-box icon-mini-box">
            <FontAwesomeIcon icon={faPaste} size="2x" fixedWidth />
          </div>
          <div className="detail-box detail-mini-box">
            <h4 className="title-box">
              <span className="number-box">{templates.length}</span> {templates.length > 1 ? 'templates' : 'template'}
            </h4>
          </div>
        </div>
        <div className="mini-box box-material">
          <div className="icon-box icon-mini-box">
            <FontAwesomeIcon icon={faSearchengin} size="2x" fixedWidth />
          </div>
          <div className="detail-box detail-mini-box">
            <h4 className="title-box">
              <span className="number-box">{searches.length}</span> {searches.length > 1 ? 'searches' : 'search'}
            </h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
