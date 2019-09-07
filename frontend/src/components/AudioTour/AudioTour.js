import React, { Component } from 'react';
import { message, Rate } from 'antd';
import './AudioTour.css';
import {Redirect} from 'react-router-dom';
import MapContainer from '../MapContainer';
import { Icon, AutoComplete, Modal, Button, Input } from 'antd';
import Player from './AudioPlayer'

const leftArrow = require('../../assets/imgs/left-arrow.svg');
const BASE_URL = "http://9db5910f.ngrok.io";

class AudioTour extends Component {
  state = {
    isFetching: false,
    hasRated: false
  }

  componentDidMount = () => {
    console.log(this.props.location);
  }

  handleRate = value => {
    if (!this.state.hasRated) {
      const formData = new FormData();
      formData.append("id", this.props.match.params.id);
      formData.append("rating", value);

      fetch(`${BASE_URL}/changeRating`, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          message.success("Your rating has successfully been recorded!", 3);
          this.setState({ hasRated: true });
        })
        .catch(error => {
          console.error(error);
          message.error("Something went wrong while trying to submit your rating.", 3);
        })
    }
  }

  redirect = () => {
    this.setState({
      redirecting: true
    })
  }

  render() {
    if (this.state.redirecting){
      return <Redirect push to="/home" />
    }
    
    const { rating, school } = this.props.location.state;

    return (
      <div className="audio-tour-container">
        <Icon type="arrow-left" onClick={this.redirect} className="iconArrow"/>
        <div className="Title">
          <p className="mainTitle">{school}</p>
        </div>
        {/* Audio player */}
        {/* < Player /> */}
        <div className="mapHolder">
          <MapContainer height={"40%"} />
        </div>
        
        <Button type="primary" className="prev">Previous</Button>
        <Button type="primary" className="next">Next</Button>
        <div className="row justify-content-center star">
          <Rate defaultValue={rating || 0} disabled={this.state.hasRated} className="audio-tour__rate" onChange={this.handleRate} />
        </div>
      </div>
    )
  }
}

export default AudioTour;
