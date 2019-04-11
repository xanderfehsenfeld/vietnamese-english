import * as React from 'react'
import { Provider as UnstatedProvider, Subscribe } from 'unstated'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Header from '../Header'
import Search, { SearchContainer } from '../SearchPage'
import Vocabulary, { VocabularyContainer } from '../Vocabulary'
import WordGraph from '../WordGraph'

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

const VocabularyGraphCompositeView = () => (
  <div className={'fill row '}>
    <div className={'col-12 d-lg-none'}>
      <Vocabulary />
    </div>

    <div className={'col-7 d-none d-lg-block'}>
      <Vocabulary />
    </div>

    <div
      className={'col-5 d-none d-lg-block'}
      style={{ borderLeft: 'solid 1px rgb(222, 226, 230)' }}
    >
      <WordGraph />
    </div>
  </div>
)

const Main = () => (
  <UnstatedProvider>
    <Subscribe to={[SearchContainer, VocabularyContainer]}>
      {({ state, fetchDictionary }: SearchContainer) => {
        if (!state.isFetching && !state.dictionary) {
          fetchDictionary()
        }
        return null
      }}
    </Subscribe>
    <Router>
      <Header />
      <div className={'container fill'}>
        <Switch>
          <Route render={VocabularyGraphCompositeView} path={'/vocabulary'} />
          <Route render={SearchVocabularyCompositeView} />
        </Switch>
      </div>
    </Router>
  </UnstatedProvider>
)

export default Main
