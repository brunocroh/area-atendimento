import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Header from 'components/header'
import history from 'utils/history'
import firebase from 'utils/firebase'
import AreaDeCobertura from './AreaDeCobertura'
import SalvarAreaCobertura from './SalvarAreaCobertura'

class Panel extends Component {
  constructor (props) {
    super(props)

    this.state = {
      menuItens: [
        {
          name: 'Sair',
          onClick: () => {
            firebase.auth().signOut()
              .then(() => history.replace('/public/home'))
          }
        }
      ]
    }
  }

  render () {
    const { menuItens } = this.state

    return (
      <div>
        <Header menuItens={menuItens}></Header>
        <Switch>
          <Route path='/panel/salvar-area' component={SalvarAreaCobertura} />
          <Route path='*' component={AreaDeCobertura} />
        </Switch>
      </div>
    )
  }
}

export default Panel
