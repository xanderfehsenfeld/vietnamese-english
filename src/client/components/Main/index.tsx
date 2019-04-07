import * as React from 'react'
import { Provider as UnstatedProvider } from 'unstated'
import Header from '../Header'
import Search from '../SearchPage'

const Main = () => (
  <UnstatedProvider>
    <Header />
    <Search />
  </UnstatedProvider>
)

export default Main
