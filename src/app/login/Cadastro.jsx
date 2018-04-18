import React, { Component } from 'react'
import { Grid, Input, Container, Button }  from 'semantic-ui-react'

class Cadastro extends Component {

  render() {
    return (
      <Container fluid>
        <Grid centered columns={16}>
          <Grid.Row>
            <Grid.Column width={4}>
              <label>Nome
                <Input fluid></Input>
              </label>
            </Grid.Column>
            <Grid.Column width={4}>
              <label>Email
                <Input type='email' fluid></Input>
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>
              <label>Senha
                <Input type='password' fluid></Input>
              </label>
            </Grid.Column>
            <Grid.Column width={4}>
              <label>Confirmar Senha
                <Input type='password' fluid></Input>
              </label>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }

}

export default Cadastro
