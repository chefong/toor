import React, {Component} from "react";
import GoogleMapLoader from "react-google-maps-loader";
import GooglePlacesSuggest from "react-google-places-suggest";
import { Input } from 'antd';
 
export default class GoogleSuggest extends React.Component {
  state = {
    search: "",
    value: "",
  }

  handleInputChange = e => {
    this.setState({search: e.target.value, value: e.target.value})
  }

  handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
    const { description } = originalPrediction;
    this.setState({ search: "", value: description });

    if (this.props.invokeModalSearch) {
      this.props.onModalSearchSelect(description);
    } else {
      this.props.onSearchSelect(description);
    }
  }
  
  handleNoResult = () => {
    console.log('No results for ', this.state.search)
  }

  handleStatusUpdate = (status) => {
    console.log(status)
  }

  render() {
    const {search, value} = this.state
    return (
      <GoogleMapLoader
        params={{
          key: process.env.REACT_APP_GOOGLE,
          libraries: "places,geocode",
        }}
        render={googleMaps =>
          googleMaps && (
            <GooglePlacesSuggest
              displayPoweredByGoogle={false}
              googleMaps={googleMaps}
              autocompletionRequest={{
                  input: search,
              }}
              onNoResult={this.handleNoResult}
              onSelectSuggest={this.handleSelectSuggest}
              onStatusUpdate={this.handleStatusUpdate}
            >
              <Input
                className="geosuggest-input"
                value={value}
                placeholder="Location"
                onChange={this.handleInputChange}
              />
            </GooglePlacesSuggest>
          )
        }
      />
    )
  }
}