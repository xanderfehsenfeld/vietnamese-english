import * as React from 'react'
import { Container, Subscribe } from 'unstated'
import axios from 'axios'
import { Link } from 'react-router-dom'
import SavedWordsBadge from '../SavedWordsBadge'

interface IState {
  startedInitialFetch: boolean
  displayName?: string
}

class HeaderContainer extends Container<IState> {
  state: IState = { startedInitialFetch: false }
  fetchUser = async () => {
    this.setState({ startedInitialFetch: true })
    const { data } = await axios.get('user')
    this.setState({ displayName: data.displayName })
  }
}

const Header = () => (
  <Subscribe to={[HeaderContainer]}>
    {({ state, fetchUser }: HeaderContainer) => {
      if (!state.startedInitialFetch) {
        fetchUser()
      }
      return (
        <div
          style={{ marginBottom: 0 }}
          className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-white border-bottom box-shadow"
        >
          <h5 className="my-0 mr-md-auto font-weight-normal">
            Vietnamese Word Explorer
          </h5>
          <nav className="my-2 my-md-0 mr-md-3">
            <span className="p-2 text-dark">
              <Link to={'/'}>Graph</Link>
            </span>
            <span className="p-2 text-dark">
              <Link to={'/words'}>Saved Words</Link> <SavedWordsBadge />
            </span>
            <span className="p-2 text-dark ">
              {state.displayName && `${state.displayName.split(' ')[0]}`}
            </span>
          </nav>
        </div>
      )
    }}
  </Subscribe>
)

export default Header
