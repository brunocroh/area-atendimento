import React, { Component } from 'react'
import { Button, Input, Header } from 'semantic-ui-react'
import ReactDOM from 'react-dom'
import L from 'leaflet'

const stages = {
  ADDRESS_INPUT: 'ADDRESS_INPUT',
  SET_LOCATION: 'SET_LOCATION',
  DRAW_POLYGON: 'DRAW_POLYGON'
}

class AreaDeCobertura extends Component {
  constructor (props) {
    super(props)

    this.state = {
      endereco: {
        gmaps: null
      },
      stage: stages.ADDRESS_INPUT,
      polygonPoints: []
    }

    this.initSearchbox = this.initSearchbox.bind(this)
    this.setLocation = this.setLocation.bind(this)
    this.confirmSetLocation = this.confirmSetLocation.bind(this)
    this.onMapClickSetLocation = this.onMapClickSetLocation.bind(this)
    this.onMapClickDrawPolygon = this.onMapClickDrawPolygon.bind(this)
  }

  componentDidMount () {
    if (window.google && window.google.maps) {
      let element = ReactDOM.findDOMNode(this)
      switch (this.state.stage) {
        case stages.SET_LOCATION:
          this.InitMap(element)
          break
        case stages.ADDRESS_INPUT:
        default:
          this.initSearchbox(element)
      }
    }
  }

  componentDidUpdate () {
    if (this.state.endereco.gmaps &&
      this.state.stage !== stages.SET_LOCATION &&
      this.state.stage !== stages.DRAW_POLYGON) {
      this.setState((prevState) => ({
        ...prevState,
        stage: stages.SET_LOCATION
      }), (teste) => this.setLocation(this.getOptionsOfMap(this.state.endereco.gmaps)))
    }
  }

  getOptionsOfMap (gmaps) {
    return {
      center: {
        lat: gmaps.geometry.location.lat(),
        lng: gmaps.geometry.location.lng()
      },
      location: gmaps.geometry.location
    }
  }

  initMap ({ lat, lng }) {
    let map = new L.Map('map', {
      center: new L.LatLng(lat, lng),
      zoom: 17
    })

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYnJ1bm9jcm9oIiwiYSI6ImNqZ3ZnZnQ1dTB6YjAzM21ydzVjbnlseGwifQ.Fo2V-EKrplRKdQF45QZJ8w', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiYnJ1bm9jcm9oIiwiYSI6ImNqZ3ZnZnQ1dTB6YjAzM21ydzVjbnlseGwifQ.Fo2V-EKrplRKdQF45QZJ8w'
    }).addTo(map)

    return map
  }

  setLocation ({ center, location }) {
    let map = this.initMap({
      lat: center.lat,
      lng: center.lng
    })

    let marker = L.marker([center.lat, center.lng]).addTo(map)
    this.setState((old) => ({...old, marker, map}))

    map.on('click', this.onMapClickSetLocation)
  }

  onMapClickDrawPolygon (event) {
    let { map, polygon, polygonPoints } = this.state

    if (polygon) {
      polygon.remove()
    }
    polygonPoints.push(event.latlng)
    polygon = L.polygon(polygonPoints)
    map.addLayer(polygon)
    this.setState((old) => ({...old, polygon, polygonPoints, mapClickEvent: event.originalEvent}))
  }

  onMapClickSetLocation (event) {
    let { map, marker } = this.state

    map.removeLayer(marker)
    marker = L.marker(Object.values(event.latlng)).addTo(map)
    this.setState((old) => ({...old, marker, mapClickEvent: event.originalEvent}))
  }

  initSearchbox (element) {
    let searchBox = new window.google.maps.places.SearchBox(
      element.querySelector('.searchLocation input')
    )

    searchBox.addListener('places_changed', () => {
      let places = searchBox.getPlaces()
      if (places.length === 0) {
        return
      }

      this.setState(prevState => ({
        ...prevState,
        endereco: {
          gmaps: places.pop()
        }
      }))
    })

    return searchBox
  }

  confirmSetLocation () {
    const { map } = this.state
    map.off('click', this.onMapClickSetLocation)
    map.on('click', this.onMapClickDrawPolygon)

    this.setState(state => ({...state, stage: stages.DRAW_POLYGON}))
  }

  render () {
    switch (this.state.stage) {
      case stages.SET_LOCATION:
        return (
          <div style={{alignText: 'center', margin: '100px auto', height: '600px', width: '75%'}}>
            <Header as='h2'>Selecione a Localizacao exata do seu ponto de atendimento</Header>
            <div id='map' style={{height: '400px'}}></div>
            <br/>
            <Button primary style={{float: 'right'}} onClick={this.confirmSetLocation}>Confirmar localizacao</Button>
          </div>
        )
      case stages.DRAW_POLYGON:
        return (
          <div style={{margin: '100px auto', height: '600px', width: '75%'}}>
            <Header as='h2'>Desenhe sua regiao de atendimento</Header>
            <div id='map' style={{height: '400px'}}></div>
            <br/>
            <Button primary style={{float: 'right'}} onClick={this.confirmDrawMap}>Confirmar regiao de atendimento</Button>
          </div>
        )
      case stages.ADDRESS_INPUT:
      default:
        return (
          <div style={{margin: '100px auto', height: '600px', width: '75%'}}>
            <Header as='h2'>Digite o endereco do seu ponto de atendimento</Header>
            <Input fluid className='searchLocation' type="text" placeholder='Digite um endereco'/>
          </div>
        )
    }
  }
}

export default AreaDeCobertura
