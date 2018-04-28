import React, { Component } from 'react'
import {
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import Header from 'components/header/Header'
import Auth from './Auth'
import Home from './Home'

class Public extends Component {
  constructor (props) {
    super(props)

    const { history } = props

    this.state = {
      menuItens: [
        {
          name: 'Login',
          onClick: () => history.push('/public/auth')
        }
      ]
    }
  }

  render () {
    const { match } = this.props
    const { menuItens } = this.state

    return (
      <div>
        <Grid.Row>
          <Header menuItens={menuItens}/>
        </Grid.Row>
        <Switch>
          <Route path={`${match.url}/home`} component={Home}></Route>
          <Route path={`${match.url}/auth`} component={Auth}></Route>
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
