import React, { Component } from 'react';
import { message, Rate } from 'antd';
import './AudioTour.css';
import {Redirect} from 'react-router-dom';
import MapContainer from '../MapContainer';
import { Icon, AutoComplete, Modal, Button, Input } from 'antd';
import Player from './AudioPlayer';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

const BASE_URL = "http://9db5910f.ngrok.io";

class AudioTour extends Component {
  state = {
    isFetching: false,
    hasRated: false
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

    const { rating, school, title } = this.props.location.state;

    return (
      <div className="audio-tour-container">
        <Icon type="arrow-left" onClick={this.redirect} className="iconArrow"/>
        <div className="row">
          <p className="schoolTitle">{school}</p>
        </div>
        <div className="Title">
          <p className="mainTitle">{title}</p>
        </div>
        <div className="rate-container row">
          <Rate defaultValue={rating || 0} disabled={this.state.hasRated} className="audio-tour__rate" onChange={this.handleRate} />
        </div>
        <div className="phone-container">
          Interested in staying updated?
        </div>
        {/* Audio player */}
         < Player link={this.props.location.state.link[0]} />
        <div className="mapHolder">
          <MapContainer height={"40%"} />
        </div>
        {/* <div className="carousel-container row justify-content-center">
          <Carousel>
            <div>
              <img src="assets/1.jpeg" />
              <p className="legend">Legend 1</p>
            </div>
            <div>
              <img src="assets/2.jpeg" />
              <p className="legend">Legend 2</p>
            </div>
            <div>
              <img src="assets/3.jpeg" />
              <p className="legend">Legend 3</p>
            </div>
          </Carousel>
        </div> */}
      </div>
    )
  }
}

export default AudioTour;
