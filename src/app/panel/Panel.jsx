import React, { Component } from 'react'
import Header from 'components/header'
import history from 'utils/history'
import firebase from 'utils/firebase'
import AreaDeCobertura from './AreaDeCobertura'

class Panel extends Component {
  constructor (props) {
    super(props)

    this.state = {
      menuItens: [
        {
          name: 'Sair',
          onClick: () => {
            firebase.auth().signOut()
              .then(() => console.log('Deslogado'))
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
        <AreaDeCobertura/>
      </div>
    )
  }
}

export default Panel
