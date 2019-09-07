import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import './Home.css';
import MapContainer from '../MapContainer';

class Home extends Component {
  state = {
    modalIsOpen: false
  }

  handleClick = () => {
    this.setState({ modalIsOpen: true });
  }

  handleCancel = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div className="home-container">
        <Button type="primary" onClick={this.handleClick}>Create</Button>
        <Modal
          centered={true}
          visible={this.state.modalIsOpen}
          onCancel={this.handleCancel}
          footer={[]}
          width="55vw"
        >
          <MapContainer />
        </Modal>
      </div>
    )
  }
}

export default Home;
