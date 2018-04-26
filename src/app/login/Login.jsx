import React, { Component } from 'react'
import { Grid, Container, Button }  from 'semantic-ui-react'

class Login extends Component {
  render () {
    return (
      <Container fluid>
        <Grid centered>
          <Grid.Row>
            <Button secondary>Login</Button>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

export default Login
