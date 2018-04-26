import React, { Component } from 'react'
import { 
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import './App.css'
import Public from './public'
import Panel from './panel'

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path='/public' component={Public}></Route>
          <Route path='/panel' component={Panel}></Route>
          <Redirect path='*' to='/public' />
        </Switch>
      </Router>
    )
  }
}

export default App
