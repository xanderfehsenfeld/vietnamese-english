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
      <Switch>
        <Route path={'/vocab'} render={Vocabulary} />
        <Route render={Search} />
      </Switch>
    </Router>
  </UnstatedProvider>
)

export default Main
