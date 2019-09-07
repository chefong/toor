import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import './Home.css';

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
          centered
          visible={this.state.modalIsOpen}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    )
  }
}

export default Home;
