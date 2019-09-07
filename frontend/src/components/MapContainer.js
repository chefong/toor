import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import './MapContainer.css'

const style = {
  width: '90%',
  margin: 'auto',
  marginTop: '24px',
  position: 'relative'
}

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [
        {
          title: "",
          name: "",
          position: { lat: 39.9522, lng: 75.1932 }
        }
      ],
      userLocation: { lat: 39.9522, lng: -75.1932 }
    };
  }



  onClick = (t, map, coord) => {
     const { latLng } = coord;
     const lat = latLng.lat();
     const lng = latLng.lng();

     this.setState(previousState => {
       return {
         markers: [
           ...previousState.markers,
           {
             title: "",
             name: "",
             position: { lat, lng }
           }
         ]
       };
     });
     this.props.updateMarkers(this.state.markers)
   }

  handleSubmitButtonClick = () => {
    console.log("hello")
    fetch("http://9db5910f.ngrok.io/point", {
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
        <Map
          google={this.props.google}
          style={{...style, height: this.props.height}}
          className="map"
          zoom={14}
          onClick={this.onClick}
          initialCenter={this.state.userLocation}
        >
          {this.state.markers && this.state.markers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.position}
            />
          ))}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (process.env.REACT_APP_GOOGLE)
})(MapContainer)
