import * as React from 'react'
import { Provider as UnstatedProvider, Subscribe } from 'unstated'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Header from '../Header'
import { AppContainer } from '../SearchPage'
import Vocabulary, { VocabularyContainer } from '../Vocabulary'
import GraphWithContainers from '../WordGraph'

const Main = () => (
  <UnstatedProvider>
    <Subscribe to={[AppContainer, VocabularyContainer]}>
      {(
        { state, fetchDictionary }: AppContainer,
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
        <Route component={GraphWithContainers} path={'/'} exact />
      </Switch>
    </Router>
  </UnstatedProvider>
)

export default Main
