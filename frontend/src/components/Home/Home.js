import React, { Component } from 'react';
import './Home.css';
import Universities_Input from '../Universities_Input';

class Home extends Component {

  render() {
    var myTxt = require("../../universities.txt");

    return (
      <div className="home-container">
        <Universities_Input
            txt={myTxt}
        />
      </div>
    )
  }
}

export default Home;
