import React, { Component } from 'react'
import { Grid, Header, Divider, Input, Container, Button } from 'semantic-ui-react'
import { Formik } from 'formik'
import firebase from 'utils/firebase'
import { connect } from 'utils/context'
import history from 'utils/history'
import messages from 'constants/messages.json'

class Auth extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: props.state.user,
      initialValuesCadastro: {
        nome: '',
        email: '',
        senha: '',
        confirmaSenha: ''
      },
      initialValuesLogin: {
        email: '',
        senha: ''
      }
    }

    this.submitFormCadastro =
    this.submitFormCadastro.bind(this)

    this.submitFormLogin =
    this.submitFormLogin.bind(this)
  }

  componentWillMount () {
    const { user } = this.props.state
    if (user.loggedIn) {
      console.log({ history })
      history.replace('/panel')
    }
  }

  submitFormCadastro (values) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.senha)
  }

  submitFormLogin (values, { setFieldError }) {
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.senha)
      .then((user) => console.log(user))
      .catch((err) => setFieldError('senha', messages[err.code]))
  }

  render () {
    console.log({state: this.props.state})
    return (
      <Container fluid>
        <Grid verticalAlign='middle' style={{height: '100vh'}}>
          <Grid centered columns={4}>
            <Grid.Column mobile={4}>
              <Formik
                initialValues={this.state.initialValuesCadastro}
                onSubmit={this.submitFormCadastro}
                render={({
                  values,
                  errors,
                  touched,
                  handleSubmit,
                  handleChange,
                  handleBlur
                }) => (
                  <form onSubmit={handleSubmit}>
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
                    {/* <Grid.Row>
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
                    </Grid.Row> */}
                    <br/>
                    <Grid.Row>
                      <Grid.Column mobile={4}>
                        <Button type='submit' fluid><i className="far fa-envelope"></i> Cadastrar com Email</Button>
                      </Grid.Column>
                    </Grid.Row>
                  </form>
                )}>
              </Formik>
            </Grid.Column>
            <Divider vertical style={{left: '50%'}}>OU</Divider>
            <Grid.Column mobile={4}>
              <Formik
                initialValues={this.state.initialValuesLogin}
                onSubmit={this.submitFormLogin}
                render={({
                  values,
                  errors,
                  touched,
                  handleSubmit,
                  handleChange,
                  handleBlur
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Header as='h2'>Ja sou cadastrado!</Header>
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
                        {errors.senha && touched.senha && <label style={{color: 'red'}}>{errors.senha}</label>}
                        <br/>
                        <Grid.Row>
                          <Grid.Column mobile={4}>
                            <Button fluid primary>Entrar</Button>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid.Column>
                    </Grid.Row>
                  </form>
                )}>
              </Formik>
            </Grid.Column>
          </Grid>
        </Grid>
      </Container>
    )
  }
}

export default connect()(Auth)
