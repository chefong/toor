import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import './MapContainer.css';
import { BASE_URL } from '../constants';

const style = {
  width: '90%',
  margin: 'auto',
  marginTop: '24px',
  position: 'relative'
}

class MapNoMarkers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      userLocation: { lat: 0, lng: 0 }
    };
  }

  handleSubmitButtonClick = () => {
    console.log("hello")
    fetch(`${BASE_URL}/point`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'markers': this.state.markers,
        'selectedUniversity': this.props.selectedUniversity
      }),
      method: "POST",
    })
      .then(resp => resp.json())
      .then(resp => {
        if (resp.message) {
          console.log("no response")
        } else {
          console.log("returned route")
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount () {
    this.setState({
      userLocation: this.props.markings[0]
    })
  }

  handleDeleteClick = () => {
    let temp = this.state.markers
    console.log(temp)
    temp.pop()
    this.setState({
      markers: temp
    })
  }

  render() {
    return (
      <div className="row justify-content-center">
        {this.state.userLocation && <Map
          google={this.props.google}
          style={{...style, height: this.props.height}}
          className="map"
          center={this.state.userLocation}
          zoom={14}
          center={this.state.userLocation}
          initialCenter={this.state.userLocation}
        >
          {this.props.markings && this.props.markings.map((marking, index) => (
            <Marker
              key={index}
              position={marking}
            />
          ))}
        </Map>}
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE)
})(MapNoMarkers)
