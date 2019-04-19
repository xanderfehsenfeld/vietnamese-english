import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Main from './components/Main'
import 'bootstrap/dist/css/bootstrap.css'
import initializeUnstatedHMR from './lib/initializeUnstatedHMR'

initializeUnstatedHMR()

ReactDOM.render(<Main />, document.getElementById('app'))
