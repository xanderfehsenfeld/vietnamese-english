import * as React from 'react'
import { Provider as UnstatedProvider } from 'unstated'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Header from '../Header'
import Search from '../SearchPage'
import Vocabulary from '../Vocabulary'

const SearchVocabularyCompositeView = () => (
  <div className={'fill row '}>
    <div className={'col-12 d-lg-none'}>
      <Search />
    </div>

    <div className={'col-7 d-none d-lg-block'}>
      <Search />
    </div>

    <div
      className={'col-5 d-none d-lg-block'}
      style={{ borderLeft: 'solid 1px rgb(222, 226, 230)' }}
    >
      <Vocabulary />
    </div>
  </div>
)

const Main = () => (
  <UnstatedProvider>
    <Router>
      <Header />
      <div className={'container fill'}>
        <Switch>
          <Route render={Vocabulary} path={'/vocabulary'} />
          <Route render={SearchVocabularyCompositeView} />
        </Switch>
      </div>
    </Router>
  </UnstatedProvider>
)

export default Main
