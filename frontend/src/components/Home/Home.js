import React, { Component } from 'react';
import { AutoComplete, Modal, Button } from 'antd';
import { universities } from '../../universities';
import './Home.css';
import MapContainer from '../MapContainer';

const BASE_URL = "http://5938164a.ngrok.io";

class Home extends Component {
  inputRef = React.createRef();

  state = {
    modalIsOpen: false,
    isUploading: false,
    dataSource: []
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

  render() {
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
            <AutoComplete
              className="home__autocomplete"
              dataSource={this.state.dataSource}
              style={{ width: '100%' }}
              onSearch={this.onSearch}
              placeholder="Search for a university..."
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
