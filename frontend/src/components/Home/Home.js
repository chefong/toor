import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import './Home.css';
import Universities_Input from '../Universities_Input';
import MapContainer from '../MapContainer';

const BASE_URL = "http://5938164a.ngrok.io";

class Home extends Component {
  inputRef = React.createRef();

  state = {
    modalIsOpen: false,
    isUploading: false
  }

  handleClick = () => {
    this.setState({ modalIsOpen: true });
  }

  handleCancel = () => {
    this.setState({ modalIsOpen: false });
  }

  handleChange = e => {
    e.preventDefault();

    this.setState({ isUploading: true });

    const formData = new FormData();
    const files = e.target.files;

    Array.from(files).forEach(file => {
      formData.append('files', file)
    })

    fetch(`${BASE_URL}/submitTour`, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({ isUploading: true });
      })
      .catch(error => {
        console.error(error);
        this.setState({ isUploading: true });
      })
  }

  handleUploadButtonClick = () => {
    this.inputRef.current.click();
  }

  render() {
    var myTxt = require("../../universities.txt");

    return (
      <div className="home">
        <Button type="primary" onClick={this.handleClick}>Create</Button>
        <Modal
          centered={true}
          visible={this.state.modalIsOpen}
          onCancel={this.handleCancel}
          footer={[]}
          width="55vw"
        >
        <MapContainer />

          <div className="container-fluid">
            <Universities_Input
               txt={myTxt}
             />
            <input type="file" name="files" ref={this.inputRef} onChange={this.handleChange} multiple hidden/>
            <div className="row justify-content-center">
              <Button type="primary" onClick={this.handleUploadButtonClick} ghost>Upload Files</Button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Home;
