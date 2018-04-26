import React, { Component } from 'react'
import {
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import Header from 'components/header/Header'
import Cadastro from './Cadastro'
import Home from './Home'

class Public extends Component {
  render () {
    const { match } = this.props

    return (
      <div>
        <Grid.Row>
          <Header {...this.props}/>
        </Grid.Row>
        <Switch>
          <Route path={`${match.url}/home`} component={Home}></Route>
          <Route path={`${match.url}/auth`} component={Cadastro}></Route>
          <Redirect path='/public' to={`${match.url}/home`} />
        </Switch>
        <Grid.Row>
          Footer
        </Grid.Row>
      </div>
    )
  }
}

export default Public
