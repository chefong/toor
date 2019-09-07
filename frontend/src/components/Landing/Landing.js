import React, { Component } from 'react';
import { Animated } from "react-animated-css";
import './Landing.css';
import marker from './googleIcon.png';



class Landing extends Component {


  render(){
    return(
        <div className="background">
          <div className="circleBase type1"></div>
          <div className="circleBase type2"></div>
          <div className="circleBase type3"></div>


        </div>
    )
  }
}

export default Landing;
