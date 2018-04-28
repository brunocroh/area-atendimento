import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class Header extends Component {
  constructor (props) {
    super(props)
  }

  renderMenuItens (itens) {
    return itens.map(item => (
      <Menu.Item key={item.name} name={item.name} onClick={item.onClick} />
    ))
  }

  render () {
    let { history, menuItens } = this.props

    return (
      <Menu pointing secondary>
        <Menu.Menu position='left'>
          <Menu.Item name='Home' onClick={() => history.push('/home')} />
        </Menu.Menu>
        <Menu.Menu position='right'>
          {this.renderMenuItens(menuItens)}
        </Menu.Menu>
      </Menu>
    )
  }
}

export default withRouter(Header)
