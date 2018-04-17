import React, { Component } from 'react'
import { 
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import Login from 'app/login/Login'
import Header from 'components/header/Header'
import Home from 'app/home/Home'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <Router>
        <div>
          <Grid.Row>
            <Header {...this.props}/>
          </Grid.Row>
          <Switch>
            <Route path='/home' component={Home}></Route>
            <Route path='/login' component={Login}></Route>
            <Redirect path='/' exact to='/home'></Redirect>
          </Switch>
          <Grid.Row>
            Footer
          </Grid.Row>
        </div>
      </Router>
    );
  }
}

export default App
