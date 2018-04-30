import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class AreaDeCobertura extends Component {
  constructor (props) {
    super(props)

    this.initMap = this.initMap.bind(this)
  }

  componentDidMount () {
    this.initMap()
  }

  initMap () {
    if (window.google && window.google.maps) {
      let element = ReactDOM.findDOMNode(this)
      let map = new window.google.maps.Map(
        element.querySelector('.map'),
        {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 13,
          mapTypeId: 'roadmap'
        }
      )
      let input = new window.google.maps.places.SearchBox(
        element.querySelector('.searchLocation')
      )
    }
  }

  render () {
    return (
      <div>
        <input className='searchLocation' type="text"/>
        <div className='map' style={{height: '400px'}}></div>
      </div>
    )
  }
}

export default AreaDeCobertura
