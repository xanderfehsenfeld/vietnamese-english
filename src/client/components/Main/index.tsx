import * as React from 'react'
import { Provider as UnstatedProvider } from 'unstated'
import Header from '../Header'
import Search from '../SearchPage'

import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Vocabulary from '../Vocabulary'

const Main = () => (
  <UnstatedProvider>
    <Router>
      <Header />
      <div className={'container fill'}>
        <div className={'fill row'}>
          <div className={'col-7'}>
            <Search />
          </div>

          <div
            className={'col-5'}
            style={{ borderLeft: 'solid 1px rgb(222, 226, 230)' }}
          >
            <Vocabulary />
          </div>
        </div>
      </div>
    </Router>
  </UnstatedProvider>
)

export default Main
