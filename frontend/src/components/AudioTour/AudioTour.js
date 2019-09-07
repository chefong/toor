import React, { Component, Fragment } from 'react';
import { Rate } from 'antd';
import { NavLink } from 'react-router-dom';
import './AudioTour.css';

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

  render() {
    return (
      <div className="audio-tour-container">
        {this.state.isFetching ?
          <div>loading...</div> : 
          <Fragment>
            <NavLink to="/home">
              <img src={leftArrow} id="left-arrow" alt=""/>
            </NavLink>
            <div className="title" id="campus">Sample Campus {this.props.match.params.id}</div>
            <div className="row justify-content-center">
              <Rate className="audio-tour__rate" onChange={this.handleRate} />
            </div>
          </Fragment>
        }
      </div>
    )
  }
}

export default AudioTour;
