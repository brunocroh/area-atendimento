import React, { Component } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import './App.css'
import Public from './public'
import Panel from './panel'
import { connect } from 'utils/context'
import firebase from 'utils/firebase'
import history from 'utils/history'

class App extends Component {
  constructor (props) {
    super(props)

    const { mutate } = props

    firebase.auth().onAuthStateChanged((firebaseUser) => {
      mutate(draft => {
        draft.user = {firebaseUser, loggedIn: !!firebaseUser}
      })
    })
  }

  render () {
    return (
      <Router history={history}>
        <Switch>
          <Route path='/public' component={Public}></Route>
          <Route path='/panel' component={Panel}></Route>
          <Redirect path='*' to='/public' />
        </Switch>
      </Router>
    )
  }
}

export default connect()(App)
