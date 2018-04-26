import React, { Component } from 'react'
import { Grid, Header, Divider, Input, Container, Button }  from 'semantic-ui-react'
import firebase from 'firebase'
import { Formik } from 'formik'

class Auth extends Component {
  constructor (props) {
    super(props)
    this.state = {
      initialValues: {
        nome: '',
        email: '',
        senha: '',
        confirmaSenha: '',
        emaillogin: '',
        senhalogin: ''
      }
    }
  }

  submitForm ({values}) {
    console.log(values)
  }

  render () {
    return (
      <Formik
        initialValues={this.state.initialValues}
        onSubmit={this.submitForm}
        render={({
          values,
          errors,
          touched,
          handleChange,
          handleBlur
        }) => (
          <Container fluid>
            <Grid verticalAlign='middle' style={{height: '100vh'}}>
              <Grid centered columns={4}>
                <Grid.Column mobile={4}>
                  <Grid.Row textAlign='center'>
                    <Header as='h2'>Quero me Cadastrar!</Header>
                  </Grid.Row>
                  <br/>
                  <Grid.Row>
                    <Grid.Column mobile={4}>
                      <label>Nome
                        <Input
                          name='nome'
                          value={values.nome}
                          fluid
                          onChange={handleChange} />
                      </label>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column mobile={4}>
                      <label>Email
                        <Input
                          name='email'
                          type='email'
                          value={values.email}
                          fluid
                          onChange={handleChange} />
                      </label>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column mobile={4}>
                      <label>Senha
                        <Input
                          name='senha'
                          type='password'
                          value={values.senha}
                          fluid
                          onChange={handleChange} />
                      </label>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column mobile={4}>
                      <label>Confirmar Senha
                        <Input
                          name='confirmaSenha'
                          type='password'
                          value={values.confirmaSenha}
                          fluid
                          onChange={handleChange} />
                      </label>
                    </Grid.Column>
                  </Grid.Row>
                  <br/>
                  <Grid.Row>
                    <Grid.Column mobile={4}>
                      <Button type='submit' fluid><i className="far fa-envelope"></i> Cadastrar com Email</Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
                <Divider vertical style={{left: '50%'}}>Or</Divider>
                <Grid.Column mobile={4}>
                  <Header as='h2'>Ja sou cadastrado!</Header>
                  <Grid.Row>
                    <Grid.Column mobile={4}>
                      <label>Email
                        <Input
                          name='emaillogin'
                          type='email'
                          value={values.emaillogin}
                          fluid
                          onChange={handleChange} />
                      </label>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column mobile={4}>
                      <label>Senha
                        <Input
                          name='senhalogin'
                          type='password'
                          value={values.senhalogin}
                          fluid
                          onChange={handleChange} />
                      </label>
                      <br/>
                      <Grid.Row>
                        <Grid.Column mobile={4}>
                          <Button fluid primary>Entrar</Button>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid.Column>
                  </Grid.Row>
                </Grid.Column>
              </Grid>
            </Grid>
          </Container>
        )}>
      </Formik>
    )
  }
}

export default Auth
