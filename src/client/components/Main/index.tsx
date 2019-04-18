import * as React from 'react'
import { Provider as UnstatedProvider, Subscribe } from 'unstated'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Header from '../Header'
import { AppContainer } from '../SearchPage'
import Vocabulary, { VocabularyContainer } from '../Vocabulary'
import GraphWithContainers from '../WordGraph'
import Container from 'react-bootstrap/Container'

const Main = () => (
  <UnstatedProvider>
    <Subscribe to={[AppContainer, VocabularyContainer]}>
      {(
        { state, fetchDictionary }: AppContainer,
        { state: vocabularyState, fetchVocabulary }: VocabularyContainer,
      ) => {
        if (!state.isFetching && !state.dictionary) {
          fetchDictionary()
        }
        if (
          !vocabularyState.isFetchingVocabulary &&
          !vocabularyState.didInitialFetch
        ) {
          fetchVocabulary()
        }
        return null
      }}
    </Subscribe>
    <Router>
      <Header />
      <Switch>
        <Route
          render={() => (
            <Container fluid={false} style={{ paddingTop: 15 }}>
              <Vocabulary />
            </Container>
          )}
          path={'/vocabulary'}
        />
        <Route component={GraphWithContainers} path={'/'} exact />
      </Switch>
    </Router>
  </UnstatedProvider>
)

export default Main
