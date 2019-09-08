import React, { Component } from 'react';
import { Icon, Button, Switch} from 'antd';
import { NavLink, Redirect } from 'react-router-dom';
import './Landing.css';
import Particles from 'react-particles-js';
import Typing from 'react-typing-animation';

const globe = require('../../assets/imgs/circleMap.svg');
const phone = require('../../assets/imgs/phone.svg');
const lightBulb = require('../../assets/imgs/lightbulb.svg');
const checked = require('../../assets/imgs/checked.svg');
const marker = require('../../assets/imgs/Marker.png')

const particlesOptions = {
  particles: {
      shape: {
        type: 'images',
        images: [
          {src: marker, height: 20, width: 20},
        ]
      },
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
      Redirect: false,
      bgColor: '',
      colorChange: false
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  darkMode = () => {
    if (this.state.colorChange === false){
      this.setState({
        bgColor: '#696969',
        colorChange: true
      })
    }
    else {
      this.setState({
        bgColor: 'white',
        colorChange: false
      })
    }
  }

  render(){
    if (this.state.Redirect){
      return <Redirect to={{ pathname: '/home' }} />
    }

    return(
      <div className="landing-container" style={{backgroundColor: this.state.bgColor}}>
        <div className="container-fluid">
          <div className="row">
            <p className="landing__header">To͝or</p>
          </div>
          <div className="row justify-content-center">
            <Particles className="particles" params={particlesOptions} />
            <div className="landing__left col-md-6">
              <div className="row justify-content-center">

                <h1 id="landing-title">Audible Experiences
                <Typing speed={70}>Start Here.</Typing>
                </h1>
              </div>
              <div className="row justify-content-center">
                <p className="landing-title-description">Experience new adventures right from your phone.</p>
              </div>
              <div className="row justify-content-center">
                <NavLink to="/home">
                  <Button type="primary" id="get-started"><span className="bold-me">Get Started</span></Button>
                </NavLink>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row justify-content-center">
                <img src={globe} className="globe" alt=""/>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="info">
              <div className="info-item">
                <img className="info-item-image" src={phone} alt=""/>
                <p className="info-description">
                  Have the opportunity to experience different place throughout the world right from your phone. Other users are able to show you around without having to be there, no traveling necessary!
                </p>
              </div>
              <div className="info-item">
                <img className="info-item-image" src={checked} alt=""/>
                <p className="info-description">
                  Let people who are passionate about their past experiences show you the world through your ears.
                </p>
              </div>
              <div className="info-item">
                <img className="info-item-image" src={lightBulb} alt=""/>
                <p className="info-description">
                  Ever wondered what it's like to experience something halfway across the world? Our services are able to help bring that reality to you by making old places new again.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="Innerfooter">Made with ♥ in Philadelphia, PA</div>
          <div className="Innerfooter">© 2019 KirbyDownB</div>
        </div>

      </div>
        // <div className="background">
        //   <div className="section1" style={{ backgroundImage : `url(${shapes})` }}>
        //     <div className="circle">
        //       <img className="pinpoint" src={pinpoint}></img>
        //     </div>
        //     <div className="titleBox">
        //     <h1 className="landing__title">Toor</h1>
        //     </div>
        //   </div>
        //   <div className="section2">
        //     <Particles className="particles" params={particlesOptions} />
        //       <div className="section2inner">
        //         <div className="section2Padding">
        //           <div className="bodyText">
        //             <h2 className="section2Header">Sign In</h2>
        //             <p className="text">Log into your account to access the features of this app</p>
        //           </div>
        //           <form onSubmit={this.handleSubmit}>
        //             <input className="input" type="text" name="Email" placeholder="Email" value={this.state.Email} onChange={this.handleChange}/>
        //             <input className="input second" type="password" name="Password" placeholder="Password" value={this.state.Password} onChange={this.handleChange}/>
        //             <button className="Login"> LOGIN </button>
        //           </form>
        //           <div className="forgotPwd">Forgot your password?</div>
        //         </div>
        //       </div>
        //     </div>
        // </div>
    )
  }
}

export default Landing;
