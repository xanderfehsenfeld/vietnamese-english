import * as React from 'react'
import { NavLink } from 'react-router-dom'
import SavedWordsBadge from '../SavedWordsBadge'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = () => (
  <div
    style={{ marginBottom: 0 }}
    className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-white border-bottom box-shadow"
  >
    <h5 className="my-0 mr-md-auto font-weight-normal">
      Vietnamese Word Explorer
    </h5>
    <nav className="my-2 my-md-0 mr-md-3">
      <span className="p-2 text-dark">
        <NavLink
          to={`/graph`}
          activeStyle={{
            color: 'black',
            textDecoration: 'none',
            cursor: 'unset',
            pointerEvents: 'none',
          }}
        >
          <FontAwesomeIcon
            icon={'project-diagram'}
            style={{ marginRight: 5 }}
            size={'lg'}
          />
          Graph
        </NavLink>
      </span>
      <span className="p-2 text-dark">
        <NavLink
          to={`/bookmarks`}
          activeStyle={{
            color: 'black',
            textDecoration: 'none',
            cursor: 'unset',
            pointerEvents: 'none',
          }}
        >
          <SavedWordsBadge />
          Bookmarks
        </NavLink>
      </span>
    </nav>
  </div>
)

export default Header
