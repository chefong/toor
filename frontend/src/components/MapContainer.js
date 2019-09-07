import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

const style = {
  width: '90%',
  height: '55%',
  margin: 'auto',
  marginTop: '20%',
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
          position: { lat: 37.778519, lng: -122.40564 }
        }
      ]
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
  }

  render() {
    return (
      <div className="row justify-content-center">
        <Map
          google={this.props.google}
          style={style}
          className={"map"}
          zoom={14}
          onClick={this.onClick}
        >
          {this.state.markers.map((marker, index) => (
            <Marker
              key={index}
              title={marker.title}
              name={marker.name}
              position={marker.position}
            />
          ))}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBXRQGWepvcs75R20UmjLQTEGhWtsIORsc')
})(MapContainer)
