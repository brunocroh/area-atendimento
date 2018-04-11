import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class Header extends Component {
  
  constructor (props) {
    super(props)
  }

  render() {
    let { history } = this.props

    return (
       <Menu pointing secondary>
        <Menu.Item name='Home' onClick={() => history.push('/home')} />
        <Menu.Menu position='right'>
          <Menu.Item name='Login' onClick={() => history.push('/login')} />
        </Menu.Menu>
      </Menu>
    );
  }
}

export default withRouter (Header)
