import React, { Component } from 'react';
import { Animated } from "react-animated-css";
import './Landing.css';
import marker from './googleIcon.png';



class Landing extends Component {


  render(){
    return(
        <div className="background">
          <div className="circleBase type1"></div>
<<<<<<< HEAD
          <div className="circleBase type2"></div>
          <div className="circleBase type3"></div>

=======
          <Animated animationIn="bounceInUp" isVisible={true}>
            <img className="marker" src={marker}></img>
          </Animated>
>>>>>>> 95b64b1166e816fa54ae96647e0e6978102f2e8b

        </div>
    )
  }
}

export default Landing;
