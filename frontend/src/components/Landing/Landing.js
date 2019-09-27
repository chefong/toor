import React, { Component } from 'react';
import { Button } from 'antd';
import { NavLink, Redirect } from 'react-router-dom';
import './Landing.css';
import Particles from 'react-particles-js';
import Typing from 'react-typing-animation';
import { particlesOptions } from '../../constants';

const globe = require('../../assets/imgs/circleMap.svg');
const phone = require('../../assets/imgs/phone.svg');
const lightBulb = require('../../assets/imgs/lightbulb.svg');
const checked = require('../../assets/imgs/checked.svg');

class Landing extends Component {
  state = {
    Email: '',
    Password: '',
    Redirect: false,
    bgColor: '',
    colorChange: false
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
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
    )
  }
}

export default Landing;
