import * as React from 'react'
import { Provider as UnstatedProvider, Subscribe } from 'unstated'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import Header from '../Header'
import { AppContainer } from '../SearchPage'
import SavedWords, { SavedWordsContainer } from '../SavedWords'
import GraphWithContainers from '../WordGraph'
import Container from 'react-bootstrap/Container'

const Main = () => (
  <UnstatedProvider>
    <Subscribe to={[AppContainer, SavedWordsContainer]}>
      {(
        { state, fetchDictionary }: AppContainer,
        { state: savedWordsState, fetchSavedWords }: SavedWordsContainer,
      ) => {
        if (!state.isFetching && !state.dictionary) {
          fetchDictionary()
        }
        if (
          !savedWordsState.isFetchingSavedWords &&
          !savedWordsState.didInitialFetch
        ) {
          fetchSavedWords()
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
              <SavedWords />
            </Container>
          )}
          path={'/words'}
        />
        <Route component={GraphWithContainers} path={'/'} />
      </Switch>
    </Router>
  </UnstatedProvider>
)

export default Main
