import React, { Component } from 'react';
import { Animated } from "react-animated-css";
import './Landing.css';
import marker from './googleIcon.png';



class Landing extends Component {


  render(){
    return(
        <div className="background">
          <div className="circleBase type1"></div>
          <Animated animationIn="bounceInUp" isVisible={true}>
            <img className="marker" src={marker}></img>
          </Animated>

        </div>
    )
  }
}

export default Landing;
