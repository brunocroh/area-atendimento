import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'
import ReactDOM from 'react-dom'

const stages = {
  ADDRESS_INPUT: 'ADDRESS_INPUT',
  MAP_DRAW: 'MAP_DRAW'
}

class AreaDeCobertura extends Component {
  constructor (props) {
    super(props)

    this.state = {
      endereco: {
        gmaps: null
      },
      stage: stages.ADDRESS_INPUT
    }

    this.initSearchbox = this.initSearchbox.bind(this)
  }

  componentDidMount () {
    if (window.google && window.google.maps) {
      let element = ReactDOM.findDOMNode(this)
      switch (this.state.stage) {
        case stages.MAP_DRAW:
          this.InitMaP(element)
          break
        case stages.ADDRESS_INPUT:
        default:
          this.initSearchbox(element)
      }
    }
  }

  componentDidUpdate () {
    if (this.state.endereco.gmaps &&
      this.state.stage !== stages.MAP_DRAW) {
      this.setState((prevState) => ({
        ...prevState,
        stage: stages.MAP_DRAW
      }))
    }
  }

  InitMap (element) {
    return new window.google.maps.Map(
      element.querySelector('.map'),
      {
        center: {lat: -33.8688, lng: 151.2195},
        zoom: 13,
        mapTypeId: 'roadmap'
      }
    )
  }

  initSearchbox (element) {
    let searchBox = new window.google.maps.places.SearchBox(
      element.querySelector('.searchLocation Input')
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

  render () {
    switch (this.state.stage) {
      case stages.MAP_DRAW:
        return (
          <div>
            <div className='map' style={{height: '400px', width: '75%'}}></div>
          </div>
        )
      case stages.ADDRESS_INPUT:
      default:
        return (
          <div>
            <Input className='searchLocation' type="text" placeholder='Digite um endereco'/>
          </div>
        )
    }
  }
}

export default AreaDeCobertura
