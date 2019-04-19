import * as React from 'react'
import { Provider as UnstatedProvider, Subscribe } from 'unstated'
import Header from '../Header'
import GraphWithContainers from '../WordGraph'
import { AppContainer } from '../SearchBar'

const Main = () => (
  <UnstatedProvider>
    {' '}
    <Subscribe to={[AppContainer]}>
      {({ state, fetchDictionary }: AppContainer) => {
        if (!state.isFetching && !state.dictionary) {
          fetchDictionary()
        }

        return (
          <React.Fragment>
            <Header />
            <GraphWithContainers key={state.selectedWord || ''} />
          </React.Fragment>
        )
      }}
    </Subscribe>
  </UnstatedProvider>
)

export default Main
