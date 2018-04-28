import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './app/App'
import State from 'utils/context'

ReactDOM.render(
  <State.Provider>
    <App />
  </State.Provider>
  , document.getElementById('root'))
