import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import Login from '../login/Login'
import Header from '../shared/components/header/Header'
import Home from '../home/Home'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
    console.log({ props })

  }

  render() {
    return (
      <Router>
        <div>
          <Grid.Row>
            <Header {...this.props}/>
          </Grid.Row>

          <Grid.Row>
            <Route path='/home' component={Home}></Route>
            <Route path='/login' component={Login}></Route>
          </Grid.Row>

          <Grid.Row>
            Footer
          </Grid.Row>
        </div>
      </Router>
    );
  }
}

export default App
