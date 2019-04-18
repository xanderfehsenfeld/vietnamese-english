import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import SavedWordsBadge from '../SavedWordsBadge'
import Search from '../SearchPage'
import SavedWords from '../SavedWords'
import React from 'react'
import { withRouter } from 'react-router'
import './index.scss'

const SavedWordsSearchTabs = withRouter(({ location, history }) => (
  <Tabs
    id="controlled-tab-example"
    activeKey={location.pathname}
    onSelect={(key: string) => history.push(key)}
    style={{ marginBottom: 10 }}
  >
    <Tab eventKey="/" title="Search" style={{ height: '100%' }}>
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
      eventKey="/SavedWordsTab"
      title={
        <React.Fragment>
          {'Saved Words'} <SavedWordsBadge />
        </React.Fragment>
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
            height: '80%',
            overflowY: 'auto',
            paddingRight: 14,
            paddingLeft: 14,
          }}
        />
      </div>
    </Tab>
  </Tabs>
))

export default SavedWordsSearchTabs
