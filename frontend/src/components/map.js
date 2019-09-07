import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

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
    console.log(this.state.markers)
    return (
      <div>
        <h1 className="text-center">YUHHHHHHHHHHHHHHHHHH</h1>
        <Map
          google={this.props.google}
          style={{ width: "80%", margin: "auto" }}
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
  apiKey: ()
})(MapContainer)
