import React, { Component } from 'react'
import { Grid, Input, Container, Button }  from 'semantic-ui-react'
import firebase from 'firebase'

class Cadastro extends Component {
  constructor (props) {
    super(props)
    this.state = {
      nome: '',
      email: '',
      senha: '',
      confirmaSenha: ''
    }

    this.handleInputChange =
    this.handleInputChange.bind(this)

  }

  handleInputChange (event) {
    const value = event.target.value
    const name = event.target.name

    this.setState({
      [name]: value
    })

  }

  render() {
    return (
      <Container fluid>
        <Grid columns={16}>
          <Grid.Row centered>
            <Grid.Column width={4}>
              <label>Nome
                <Input 
                  name='nome' 
                  fluid
                  onChange={this.handleInputChange} />
              </label>
            </Grid.Column>
            <Grid.Column width={4}>
              <label>Email
                <Input 
                  name='email' 
                  type='email'
                  fluid 
                  onChange={this.handleInputChange} />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column width={4}>
              <label>Senha
                <Input 
                  name='senha' 
                  type='password' 
                  fluid onChange={this.handleInputChange} />
              </label>
            </Grid.Column>
            <Grid.Column width={4}>
              <label>Confirmar Senha
                <Input 
                  name='confirmaSenha' 
                  type='password' 
                  fluid
                  fluid onChange={this.handleInputChange} />
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column  width={8}>
              <Button fluid primary>Cadastrar</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }

}

export default Cadastro
