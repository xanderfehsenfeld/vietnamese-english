import * as React from 'react'
import { Provider as UnstatedProvider, Subscribe } from 'unstated'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Header from '../Header'
import { AppContainer } from '../SearchBar'
import SavedWords from '../SavedWords'
import GraphWithContainers from '../WordGraph'
import Container from 'react-bootstrap/Container'

const Main = () => (
  <UnstatedProvider>
    <Subscribe to={[AppContainer]}>
      {({ state, fetchDictionary, fetchState }: AppContainer) => {
        if (!state.isFetching && !state.dictionary) {
          fetchDictionary()
        }
        if (!state.isFetchingSavedWords && !state.didInitialFetch) {
          fetchState()
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
          path={'/bookmarks'}
        />
        <Route component={GraphWithContainers} path={'/graph'} />
        <Route />
      </Switch>
    </Router>
  </UnstatedProvider>
)

export default Main
