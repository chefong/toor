import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { AutoComplete, Modal, Button, Input } from 'antd';
import { universities } from '../../universities';
import './Home.css';
import MapContainer from '../MapContainer';
import Item from '../Item/Item';
import {Animated} from "react-animated-css";


const BASE_URL = "http://5938164a.ngrok.io";

class Home extends Component {
  inputRef = React.createRef();

  state = {
    modalIsOpen: false,
    isUploading: false,
    dataSource: [],
    selectedUniversity: '',
    audioTours: [
      {
        id: 1,
        rating: 2
      },
      {
        id: 2,
        rating: 4
      }
    ]
  }

  handleClick = () => {
    this.setState({ modalIsOpen: true });
  }

  handleCancel = () => {
    this.setState({ modalIsOpen: false });
  }

  handleDeleteClick = () => {

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
        this.setState({ isUploading: false });
      })
      .catch(error => {
        console.error(error);
        this.setState({ isUploading: false });
      })
  }

  handleUploadButtonClick = () => {
    this.inputRef.current.click();
  }

  onSearch = text => {
    this.setState({
      dataSource: universities.filter(university => university.substring(0, text.length).toLowerCase() === text.toLowerCase())
    });
  }

  onSelect = value => {
    this.setState({ selectedUniversity: value });
  }

  render() {
    return (
      <div className="home">
        <div className="container-fluid">
          <NavLink to="/">
            <h1 className="title">To͝or</h1>
          </NavLink>
          <div className="row justify-content-center">
            <AutoComplete
              className="home__autocomplete"
              id="first"
              dataSource={this.state.dataSource}
              style={{ width: '304px' }}
              onSearch={this.onSearch}
              onSelect={this.onSelect}
              placeholder="Search for a university..."
            />
          </div>
          {this.state.audioTours && this.state.audioTours.map(audioTour => {
            return (
              <NavLink to={`/home/audio-tour/${audioTour.id}`}>
                <Animated animationIn="slideInLeft" animationOut="fadeOut" isVisible={true}>
                  <Item {...audioTour} />
                </Animated>
              </NavLink>
            )
          })}
          <div className="row justify-content-center">
            <Button shape="round" className="home__plus" type="primary" onClick={this.handleClick}><span className="bold-me">+</span></Button>
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
              <Input className="home__input-title" placeholder="Title" />
              <input type="file" name="files" ref={this.inputRef} onChange={this.handleChange} multiple hidden/>
              <div className="row justify-content-center">
                <Button type="primary" onClick={this.handleUploadButtonClick} ghost>Upload Files</Button>
              </div>
              <MapContainer height={"50%"} selectedUniversity={this.state.selectedUniversity}/>
              <div className="row justify-content-center">
              </div>
            </div>
          </Modal>
        </div>
      </div>
    )
  }
}

export default Home;
