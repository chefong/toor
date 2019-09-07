import React, { Component } from 'react';
import { Animated } from "react-animated-css";
import {Redirect} from 'react-router-dom';
import './Landing.css';
import Particles from 'react-particles-js';
import pinpoint from './pinpoint.png';
import shapes from './shapes.svg';


const particlesOptions = {
  particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800
        }
      },
      size: {
          value: 6,
          random: true,
          anim: {
              speed: 5.5,
              size_min: 3
          }
      },
      line_linked: {
	            enable: false
      },
      move: {
	            random: true,
	            speed: 1,
	            direction: "bottom",
	            out_mode: "out"
      },
      color:  {
        value: "#33BEFF"
      }
    },
      interactivity: {
	        events: {
	            onclick: {
	                enable: true,
	                mode: "remove"
	            }
	        },
	        modes: {
	            remove: {
	                particles_nb: 11
	            }
	        }
	    }
}

class Landing extends Component {
  constructor(props){
  super(props)
    this.state = {
      Email: '',
      Password: '',
      Redirect: false
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
     event.preventDefault()
     this.setState({
       Email: '',
       Password: '',
       Redirect: true
   })
  }


  render(){
    if (this.state.Redirect){
      return <Redirect to={{pathname: '/home'}} />
    }

    return(
        <div className="background">
          <div className="section1" style={{ backgroundImage : `url(${shapes})` }}>
            <div className="circle">
              <img className="pinpoint" src={pinpoint}></img>
            </div>
            <div className="titleBox">
            <h1 className="landing__title">Toor</h1>
            </div>
          </div>
          <div className="section2">
            <Particles className="particles" params={particlesOptions} />
              <div className="section2inner">
                <div className="section2Padding">
                  <div className="bodyText">
                    <h2 className="section2Header">Sign In</h2>
                    <p className="text">Log into your account to access the features of this app</p>
                  </div>
                  <form onSubmit={this.handleSubmit}>
                    <input className="input" type="text" name="Email" placeholder="Email" value={this.state.Email} onChange={this.handleChange}/>
                    <input className="input second" type="password" name="Password" placeholder="Password" value={this.state.Password} onChange={this.handleChange}/>
                    <button className="Login"> LOGIN </button>
                  </form>
                  <div className="forgotPwd">Forgot your password?</div>
                </div>
              </div>
            </div>
        </div>
    )
  }
}

export default Landing;
