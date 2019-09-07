import React, { Component, Fragment } from 'react';
import { Rate } from 'antd';
import { NavLink } from 'react-router-dom';
import './AudioTour.css';
import {Redirect} from 'react-router-dom';
import MapContainer from '../MapContainer';
import { Icon, AutoComplete, Modal, Button, Input } from 'antd';
import Player from './AudioPlayer'

const leftArrow = require('../../assets/imgs/left-arrow.svg');

class AudioTour extends Component {
  state = {
    isFetching: false
  }

  componentDidMount = () => {
    const id = this.props.match.params.id;
    // Fetch from backend
  }

  handleRate = value => {
    console.log(value)
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
    return (
      <div className="audio-tour-container">
        <Icon type="arrow-left" onClick={this.redirect} className="iconArrow"/>
        <div className="Title">
          <p className="mainTitle">University of Pennsylvania</p>
        </div>
        
        <div className="mapHolder">
          <MapContainer height={"40%"} />
        </div>

        {/* Audio player */}
        <Player className="audio-player" />

        <Button type="primary" className="prev">Previous</Button>
        <Button type="primary" className="next">Next</Button>
        <div className="row justify-content-center star">
          <Rate className="audio-tour__rate" onChange={this.handleRate} />
        </div>
      </div>
    )
  }
}

export default AudioTour;
