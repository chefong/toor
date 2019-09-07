import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { message, AutoComplete, Modal, Button, Input } from 'antd';
import { universities } from '../../universities';
import './Home.css';
import MapContainer from '../MapContainer';
import Item from '../Item/Item';
import {Animated} from "react-animated-css";


const BASE_URL = "http://9db5910f.ngrok.io";
const spinner = require('../../assets/imgs/spinner.svg');

class Home extends Component {
  inputRef = React.createRef();

  state = {
    modalIsOpen: false,
    isFetching: false,
    dataSource: [],
    selectedUniversity: '',
    title: '',
    link: '',
    files: [],
    searchResults: [],
    audioTours: [
      {
        id: 1,
        rating: 2
      },
      {
        id: 2,
        rating: 4
      },
      {
        id: 3,
        rating: 4
      }
    ],
    markers: []
  }

  componentDidMount = () => {
    this.setState({ isFetching: true });
    fetch(`${BASE_URL}/selectN/4`)
      .then(response => response.json())
      .then(data => {
        const searchResults = data.map(({ id, rating, school, title }) => ({ id, rating, school, title }));
        this.setState({ searchResults, isFetching: false });
      })
      .catch(error => {
        console.error(error);
        this.setState({ isFetching: false });
      });
  }

  updateMarkers = (temp) => {
    this.setState({
      markers: temp
    })
  }


  handleClick = () => {
    this.setState({ modalIsOpen: true });
  }

  handleCancel = () => {
    this.setState({ modalIsOpen: false });
  }

  handleChange = e => {
    e.preventDefault();
    const files = e.target.files;
    this.setState({ files });
  }

  handleUploadButtonClick = () => {
    this.inputRef.current.click();
  }

  onSearch = text => {
    this.setState({
      dataSource: universities.filter(university => university.substring(0, text.length).toLowerCase() === text.toLowerCase())
    });
  }

  onModalSearchSelect = value => {
    this.setState({ selectedUniversity: value });
  }

  handleSubmitButtonClick = e => {
    e.preventDefault();

    this.setState({ isFetching: true });

    const formData = new FormData();
    Array.from(this.state.files).forEach(file => {
      formData.append('files', file)
    })

    formData.append('school', this.state.selectedUniversity);
    formData.append('title', this.state.title);
    for (var i = 0; i < this.state.markers.length; i++) {
      formData.append(i, JSON.stringify(this.state.markers[i].position));
    }
    formData.append('size', this.state.markers.length)


    fetch(`${BASE_URL}/submitTour`, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        message.success("Your audio tour has successfully been submitted!");
        this.setState({
          isFetching: false,
          modalIsOpen: false
        });
      })
      .catch(error => {
        console.error(error);
        message.error("Something went wrong while trying to submit your audio tour.");
        this.setState({ isFetching: false });
      })
  }

  handleTitleInput = e => {
    this.setState({ title: e.target.value });
  }

  onSearchSelect = value => {
    const formData = new FormData();
    formData.append('school', value);

    fetch(`${BASE_URL}/search`, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const searchResults = data.map(({ id, link, rating, school, title }) => ({ id, link, rating, school, title }));
        console.log('searchResult' , searchResults);
        this.setState({ searchResults, isFetching: false });
      })
      .catch(error => {
        console.error(error);
        this.setState({ isFetching: false });
      })
  }

  render() {
    return (
      <div className="home">
        <div className="container-fluid">
          <Link to="/">
            <h1 className="title">To͝or</h1>
          </Link>
          <div className="row justify-content-center">
            <AutoComplete
              className="home__autocomplete"
              id="first"
              dataSource={this.state.dataSource}
              style={{ width: '304px' }}
              onSearch={this.onSearch}
              onSelect={this.onSearchSelect}
              placeholder="Search for a university..."
            />
          </div>
          {this.state.isFetching
            ? <div className="spinner-container">
                <div className="row justify-content-center">
                  <img src={spinner} className="spinner" alt=""/>
                </div>
              </div>
            : <Fragment>
              {this.state.searchResults && this.state.searchResults.map(result => {
                console.log("resultttt ", result)
                return (
                  <Link to={{ pathname: `/home/audio-tour/${result.id}`, state: {...result} }}>
                    <Item {...result} />
                  </Link>
                )
              })}
              {
                (this.state.searchResults.length == 0)? ( <div> No audio tour available </div>) : <div></div>
              }
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
                    onSelect={this.onModalSearchSelect}
                    placeholder="Search for a university..."
                  />
                  <Input className="home__input-title" placeholder="Title" name="title" onChange={this.handleTitleInput} />
                  <input type="file" name="files" ref={this.inputRef} onChange={this.handleChange} multiple hidden/>
                  <div className="row justify-content-center">
                    <Button type="primary" onClick={this.handleUploadButtonClick} ghost>Upload Files</Button>
                  </div>
                  <MapContainer height={"50%"} updateMarkers={this.updateMarkers}/>
                  <div className="row justify-content-center">
                    <Button className="home__submit-button" type="primary" loading={this.state.isFetching} onClick={this.handleSubmitButtonClick}>Submit</Button>
                  </div>
                </div>
              </Modal>
            </Fragment>}
        </div>
      </div>
    )
  }
}

export default Home;
