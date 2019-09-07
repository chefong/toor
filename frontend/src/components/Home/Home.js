import React, { Component } from 'react';
import { AutoComplete, Modal, Button, Input } from 'antd';
import { universities } from '../../universities';
import './Home.css';
import MapContainer from '../MapContainer';

const BASE_URL = "http://5938164a.ngrok.io";

class Home extends Component {
  inputRef = React.createRef();

  state = {
    modalIsOpen: false,
    isUploading: false,
    dataSource: [],
    selectedUniversity: '',
    audioTours:[]
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

  onSearch = text => {
    this.setState({
      dataSource: universities.filter(university => university.substring(0, text.length) === text)
    });
  }

  onSelect = value => {
    this.setState({ selectedUniversity: value });
  }

  render() {
    return (
      <div className="home">
        <div className="container-fluid">
          <h1 className="home__title">To͝or</h1>
          <div className="row justify-content-center">
            <AutoComplete
              className="home__autocomplete"
              id="first"
              dataSource={this.state.dataSource}
              style={{ width: '80%' }}
              onSearch={this.onSearch}
              onSelect={this.onSelect}
              placeholder="Search for a university..."
            />
          </div>
          <div className="row justify-content-center">
            <Button className="home__plus" type="primary" onClick={this.handleClick}><span className="bold-me">+</span></Button>
          </div>
          <Modal
            centered
            visible={this.state.modalIsOpen}
            onCancel={this.handleCancel}
            footer={[]}
            width="90vw"
          >
            <div className="container-fluid">
              <AutoComplete
                className="home__autocomplete"
                dataSource={this.state.dataSource}
                style={{ width: '100%' }}
                onSearch={this.onSearch}
                onSelect={this.onSelect}
                placeholder="Search for a university..."
              />
              <input type="file" name="files" ref={this.inputRef} onChange={this.handleChange} multiple hidden/>
              <div className="row justify-content-center">
                <Button type="primary" onClick={this.handleUploadButtonClick} ghost>Upload Files</Button>
              </div>
              <MapContainer />
              <div className="row justify-content-center">
                <Button className="home__submit-button" type="primary" onClick={this.handleSubmitButtonClick}>Submit</Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    )
  }
}

export default Home;
