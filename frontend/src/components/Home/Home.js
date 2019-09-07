import React, { Component } from 'react';
import './Home.css';
import UniversitiesList from '../Universities-List'

class Home extends Component {
  render() {
    return (
      <div className="home-container">
        < UniversitiesList />
      </div>
    )
  }
}

export default Home;
