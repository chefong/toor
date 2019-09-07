import React, { Component } from 'react';
import './AudioTour.css';

const leftArrow = require('../../assets/imgs/left-arrow.svg');

class AudioTour extends Component {
  componentDidMount = () => {
    const id = this.props.match.params.id;
  }

  render() {
    return (
      <div className="title" id="campus">Sample Campus</div>
    )
  }
}

export default AudioTour;
