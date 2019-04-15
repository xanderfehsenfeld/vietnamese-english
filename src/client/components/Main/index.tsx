import * as React from 'react'
import { Provider as UnstatedProvider, Subscribe } from 'unstated'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Header from '../Header'
import Search, { SearchContainer } from '../SearchPage'
import Vocabulary, { VocabularyContainer } from '../Vocabulary'
import GraphWithContainers from '../WordGraph'

const SearchVocabularyCompositeView = () => (
  <div className={'container fill'}>
    <div className={' row '}>
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
  </div>
)

const Main = () => (
  <UnstatedProvider>
    <Subscribe to={[SearchContainer, VocabularyContainer]}>
      {(
        { state, fetchDictionary }: SearchContainer,
        { state: vocabularyState, fetchState }: VocabularyContainer,
      ) => {
        if (!state.isFetching && !state.dictionary) {
          fetchDictionary()
        }
        if (
          !vocabularyState.isFetchingState &&
          !vocabularyState.didInitialFetch
        ) {
          fetchState()
        }
        return null
      }}
    </Subscribe>
    <Router>
      <Header />
      <Switch>
        <Route component={Vocabulary} path={'/vocabulary'} />
        <Route component={GraphWithContainers} path={'/graph'} />
        <Route render={SearchVocabularyCompositeView} />
      </Switch>
    </Router>
  </UnstatedProvider>
)

export default Main
