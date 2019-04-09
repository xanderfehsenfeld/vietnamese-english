import * as React from 'react'
import { Container, Subscribe } from 'unstated'
import axios from 'axios'
import { Link, NavLink } from 'react-router-dom'

interface IState {
  startedInitialFetch: boolean
  displayName?: string
}

class HeaderContainer extends Container<IState> {
  state: IState = { startedInitialFetch: false }
  fetchUser = async () => {
    this.setState({ startedInitialFetch: true })
    const { data } = await axios.get('/user')
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
        <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
          <h5 className="my-0 mr-md-auto font-weight-normal">
            vietnamese-english
          </h5>
          <nav className="my-2 my-md-0 mr-md-3">
            <span className="p-2 text-dark">
              <NavLink to={'/vocab'}>Vocabulary</NavLink>
            </span>
            <span className="p-2 text-dark">
              <NavLink to={'/'}>Search</NavLink>
            </span>

            <span className="p-2 text-dark">
              {state.displayName && `${state.displayName.split(' ')[0]}`}
            </span>
          </nav>
        </div>
      )
    }}
  </Subscribe>
)

export default Header
