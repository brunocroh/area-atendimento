import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Header extends Component {
  
  constructor (props) {
    super(props)
    let { history } = this.props
    console.log(history)

  }

  render() {
    return (
       <Menu pointing secondary>
        <Link to="/home">Home</Link>
        <Link to="/login">Login</Link>
        <Menu.Item name='home' />
        <Menu.Item name='messages' />
        <Menu.Item name='friends' />
        <Menu.Menu position='right'>
          <Menu.Item name='logout' />
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Header
