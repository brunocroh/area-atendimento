import React, { Component } from 'react'
import { Modal, Checkbox, Grid, Button, Input, Header } from 'semantic-ui-react'
import { connect } from 'utils/context'
import firebase, { db } from 'utils/firebase'

class SalvarAreaCobertura extends Component {
  constructor (props) {
    super(props)

    this.state = {
      configuracao: {
        uid: '',
        descricao: '',
        verificarCobertura: false,
        verificarCoberturaSuccess: '',
        verificarCoberturaError: '',
        mostrarPontoAtendimento: false,
        mostrarRegiaoAtendimento: false,
        coletarInformacoes: true,
        idDiv: '',
        mapWidth: '',
        mapHeight: ''
      },
      saved: false
    }

    this.toggle = this.toggle.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleSalvar = this.handleSalvar.bind(this)
  }

  componentDidUpdate () {
    const { configuracao: newConfiguracao } = this.props.state
    const { configuracao } = this.state

    if (configuracao.uid !== newConfiguracao.uid) {
      this.setState((old, props) => {
        return {
          ...old,
          ...props.state,
          configuracao: {
            ...old.configuracao,
            ...props.state.configuracao
          }
        }
      })
    }
  }

  _renderVerificarCobertura () {
    const { configuracao } = this.state

    if (configuracao.verificarCobertura) {
      return (
        <Grid.Row columns={2}>
          <Grid.Column width={8}>
            <label>Mensagem quando tem cobertura
              <Input
                id='verificarCoberturaSuccess'
                onChange={this.handleInput}
                value={configuracao ? configuracao.verificarCoberturaSuccess : ''}
                fluid/>
            </label>
          </Grid.Column>
          <Grid.Column width={8}>
            <label>Mensagem quando não tem cobertura
              <Input
                id='verificarCoberturaError'
                onChange={this.handleInput}
                value={configuracao ? configuracao.verificarCoberturaError : ''}
                fluid/>
            </label>
          </Grid.Column>
        </Grid.Row>
      )
    }
  }

  toggle (x) {
    this.setState({
      ...this.state,
      configuracao: {
        ...this.state.configuracao,
        [x]: !this.state.configuracao[x]
      }
    })
  }

  handleInput (evt) {
    const { target } = evt

    this.setState({
      ...this.state,
      configuracao: {
        ...this.state.configuracao,
        [target.id]: target.value
      }
    })
  }

  handleSalvar () {
    const { user, configuracao } = this.state
    const { uid, ...restConfiguracao } = configuracao

    let fireConfiguracao = db
      .collection(user.firebaseUser.uid)
      .doc('area-atendimento')
      .collection('configuracoes')
      .doc(uid)

    fireConfiguracao
      .update(restConfiguracao)
      .then(() => this.setState({...this.state, saved: true}))
  }

  renderPre () {
    const { configuracao, user } = this.state

    if(user) {
      return (
        <pre>{`
<script src="https://unpkg.com/firebase@4.12.1/firebase-app.js"></script>
<script src="https://unpkg.com/firebase@4.12.1/firebase-firestore.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCYPEEXTjqLQfJ-Cm8xz2y3Z2itDNkkIdY&libraries=places"></script>
<script>
  window.config = {
    idusuario: "${user.firebaseUser.uid}",
    idconfiguracao: "${configuracao.uid}"
  }
</script>
<script src="https://rawgit.com/brunocroh/area-atendimento/master/areaAtendimento.js"></script>
        `}</pre>
      )
    }

    return (
      <div></div>
    )
  }

  render () {
    const { configuracao, saved } = this.state

    return (
      <div style={{alignText: 'center', margin: '100px auto', height: '600px', width: '75%'}}>
        <Modal closeIcon onClose={() => this.setState({...this.state, saved: false})} open={saved}>
          <Modal.Content>
            <div>
              {'copie e cole o seguinte codigo no seu site:'}
              {this.renderPre()}
            </div>
          </Modal.Content>
        </Modal>
        <Grid columns={2}>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header as='h2'>Configure sua área de atendimento</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <label>Codigo da localizacao
                <Input
                  value={configuracao ? configuracao.uid : ''}
                  disabled
                  fluid/>
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column width={16}>
              <label>Descricao da localizacao
                <Input
                  id='descricao'
                  onChange={this.handleInput}
                  value={configuracao ? configuracao.descricao : ''}
                  fluid/>
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column width={3}>
              <label>ID html para renderizar o mapa
                <Input
                  id='idDiv'
                  onChange={this.handleInput}
                  value={configuracao ? configuracao.idDiv : ''}
                  fluid/>
              </label>
            </Grid.Column>
            <Grid.Column width={3}>
              <label>Largura do Mapa
                <Input
                  id='mapWidth'
                  onChange={this.handleInput}
                  value={configuracao ? configuracao.mapWidth : ''}
                  fluid/>
              </label>
            </Grid.Column>
            <Grid.Column width={3}>
              <label>Altura do mapa
                <Input
                  id='mapHeight'
                  onChange={this.handleInput}
                  value={configuracao ? configuracao.mapHeight : ''}
                  fluid/>
              </label>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column width={16}>
              <Checkbox
                onChange={() => this.toggle('verificarCobertura')}
                toggle
                checked={configuracao.verificarCobertura}
                label='Permitir usuário verificar cobertura em sua localização'/>
            </Grid.Column>
          </Grid.Row>
          {this._renderVerificarCobertura()}
          <Grid.Row columns={2}>
            <Grid.Column width={16}>
              <Checkbox
                onChange={() => this.toggle('mostrarRegiaoAtendimento')}
                checked={configuracao.mostrarRegiaoAtendimento}
                label='Permitir usuário ver sua área de atendimento'/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column width={16}>
              <Checkbox
                onChange={() => this.toggle('mostrarPontoAtendimento')}
                checked={configuracao.mostrarPontoAtendimento}
                label='Permitir usuário ver a localização exata do seu ponto de atendimento'/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column width={16}>
              <Checkbox
                onChange={() => this.toggle('coletarInformacoes')}
                checked={configuracao.coletarInformacoes}
                label='Coletar informações do usuário'/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Button primary style={{float: 'right'}} onClick={this.handleSalvar}>Salvar área de atendimento</Button>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default connect()(SalvarAreaCobertura)
