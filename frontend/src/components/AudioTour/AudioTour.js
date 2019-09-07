import React, { Component } from 'react';
import { Rate } from 'antd';
import './AudioTour.css';

const leftArrow = require('../../assets/imgs/left-arrow.svg');

class AudioTour extends Component {
  componentDidMount = () => {
    const id = this.props.match.params.id;
  }

  handleRate = value => {
    console.log(value)
  }

  render() {
    return (
      <div className="audio-tour-container">
        <div className="title" id="campus">Sample Campus</div>
        <div className="row justify-content-center">
          <Rate className="audio-tour__rate" onChange={this.handleRate} />
        </div>
      </div>
    )
  }
}

export default AudioTour;
