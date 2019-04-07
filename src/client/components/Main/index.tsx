import * as React from 'react'
import { Provider as UnstatedProvider } from 'unstated'
import Header from '../Header'

const Main = () => (
  <UnstatedProvider>
    <Header />
    <div className={'container'}>
      <div className="md-form mt-0">
        <input
          className="form-control"
          type="text"
          placeholder="Search..."
          aria-label="Search"
        />
      </div>
    </div>
  </UnstatedProvider>
)

export default Main
