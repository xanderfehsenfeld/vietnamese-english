import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import SavedWordsBadge from '../SavedWordsBadge'
import Search from '../SearchBar'
import SavedWords from '../SavedWords'
import React from 'react'
import { withRouter } from 'react-router'
import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSearch,
  faMagic,
  faBookmark,
} from '@fortawesome/free-solid-svg-icons'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

library.add(faSearch, faMagic, faBookmark)

const iconSize = 'lg'

const SavedWordsSearchTabs = withRouter(({ location, history, children }) => (
  <Tabs
    id={'SavedWordsSearchTabs'}
    activeKey={location.pathname}
    onSelect={(key: string) => history.push(key)}
    style={{ marginBottom: 10 }}
  >
    <Tab
      eventKey="/graph"
      title={
        <OverlayTrigger
          placement={'bottom'}
          overlay={<Tooltip id={`tooltip-${'search'}`}>{`Search`}</Tooltip>}
        >
          <FontAwesomeIcon icon={'search'} size={iconSize} />
        </OverlayTrigger>
      }
      style={{ height: '100%' }}
    >
      <div
        style={{
          height: '100%',
          overflowY: 'hidden',
          maxHeight: 'calc(100vh - 68px) ',
          marginRight: -14,
          marginLeft: -14,
        }}
      >
        <Search />
      </div>
    </Tab>
    <Tab
      style={{ height: '100%' }}
      eventKey="/graph/bookmarks"
      title={
        <OverlayTrigger
          placement={'bottom'}
          overlay={<Tooltip id={`tooltip-${'bottom'}`}>{`Bookmarks`}</Tooltip>}
        >
          <div>
            <SavedWordsBadge />
          </div>
        </OverlayTrigger>
      }
    >
      <div
        style={{
          height: '100%',
          overflowY: 'hidden',
          maxHeight: 'calc(100vh - 10px) ',
          marginRight: -14,
          marginLeft: -14,
        }}
      >
        <SavedWords
          style={{
            height: '100%',
            overflowY: 'auto',
            paddingRight: 14,
            paddingLeft: 14,
          }}
        />
      </div>
    </Tab>
    {children}
  </Tabs>
))

export default SavedWordsSearchTabs
