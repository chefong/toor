import React, { Component } from 'react';
import { Rate } from 'antd';
import './AudioTour.css';
import {Redirect} from 'react-router-dom';
import MapContainer from '../MapContainer';
import { Icon, AutoComplete, Modal, Button, Input } from 'antd';


const leftArrow = require('../../assets/imgs/left-arrow.svg');

class AudioTour extends Component {
  constructor(){
    super();
    this.state = {
      redirecting: false
    }
  }
  componentDidMount = () => {
    const id = this.props.match.params.id;
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
          <h2 className="mainTitle">University of Pennsylvania</h2>
        </div>
        <div className="mapHolder">
          <MapContainer/>
        </div>
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
