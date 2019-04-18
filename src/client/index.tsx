import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Main from './components/Main'
import 'bootstrap/dist/css/bootstrap.css'
// import HMR from 'unstated-hmr' // Just load the library before initializing the containers

// if (process) {
//   HMR.isEnabled = process && process.env.NODE_ENV !== 'production'
// }

ReactDOM.render(<Main />, document.getElementById('app'))
