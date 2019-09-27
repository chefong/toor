import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { message, Alert, Modal, Button, Input } from 'antd';
import { universities } from '../../universities';
import './Home.css';
import MapContainer from '../MapContainer';
import Item from '../Item/Item';
import Geocode from "react-geocode";
import GeoSuggest from '../GeoSuggest';
import { BASE_URL } from '../../constants';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE);
Geocode.enableDebug();

const spinner = require('../../assets/imgs/spinner.svg');

class Home extends Component {
  inputRef = React.createRef();

  state = {
    modalIsOpen: false,
    isFetching: false,
    dataSource: [],
    searchValue: '',
    title: '',
    link: '',
    files: [],
    searchResults: [],
    markers: [],
    queryCoordinates: null,
    recentlySearchedLocation: ''
  }

  componentDidMount = () => {
    this.setState({ isFetching: true });

    if (this.state.recentlySearchedLocation) {
      fetch(`${BASE_URL}/getByLocation/${this.state.recentlySearchedLocation}`)
      .then(response => response.json())
      .then(data => {
        const searchResults = data.map(({ id, rating, school, title , link, markers }) => ({ id, rating, school, title, link, markers }));
        this.setState({ searchResults, isFetching: false });
      })
      .catch(error => {
        console.error(error);
        this.setState({ isFetching: false });
      });
    } else {
      fetch(`${BASE_URL}/selectN/4`)
        .then(response => response.json())
        .then(data => {
          const searchResults = data.map(({ id, rating, school, title , link, markers }) => ({ id, rating, school, title, link, markers }));
          this.setState({ searchResults, isFetching: false });
        })
        .catch(error => {
          console.error(error);
          this.setState({ isFetching: false });
        });
    }
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
    message.success(`${files.length} files have been received`);
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
    this.setState({ searchValue: value });

    Geocode.fromAddress(value).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({ queryCoordinates: { lat, lng }});
      },
      error => {
        console.error(error);
      }
    );
  }

  handleSubmitButtonClick = e => {
    e.preventDefault();

    const { files, searchValue: searchValue, title, markers } = this.state;
    if (files.length == 0 || !searchValue || !title || markers.length == 0) {
      message.warn("One or more fields is missing!");
      return;
    }

    this.setState({ isFetching: true });

    const formData = new FormData();
    Array.from(this.state.files).forEach(file => {
      formData.append('files', file)
    })

    formData.append('school', this.state.searchValue);
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
          modalIsOpen: false
        });
        fetch(`${BASE_URL}/getByLocation/${this.state.searchValue}`)
          .then(response => response.json())
          .then(dataObj => {
            console.log(dataObj)
            const searchResults = dataObj.map(({ id, rating, school, title , link, markers }) => ({ id, rating, school, title, link, markers }));
            this.setState({ searchResults, isFetching: false });
          })
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
        const searchResults = data.map(({ id, link, rating, school, title, markers }) => ({ id, link, rating, school, title, markers }));
        this.setState({ searchResults, isFetching: false });
      })
      .catch(error => {
        console.error(error);
        this.setState({ isFetching: false });
      })
  }

  render() {
    console.log(this.state.searchResults)
    return (
      <div className="home">
        <div className="container-fluid">
          <Link to="/">
            <h1 className="title">To͝or</h1>
          </Link>
          <div className="row justify-content-center">
            <div className="col-11">
              <GeoSuggest invokeModalSearch={false} onSearchSelect={this.onSearchSelect} />
            </div>
          </div>
          {this.state.isFetching
            ? <div className="spinner-container">
                <div className="row justify-content-center">
                  <img src={spinner} className="spinner" alt=""/>
                </div>
              </div>
            : <Fragment>
              {this.state.searchResults && this.state.searchResults.map(result => {
                return (
                  <Link to={{ pathname: `/home/audio-tour/${result.id}`, state: {...result} }}>
                    <Item {...result} />
                  </Link>
                )
              })}
              {
                (this.state.searchResults.length == 0)? (<Alert message="No audio tours available for this campus." type="warning"/>) : <div></div>
              }
              <div className="row justify-content-center">
                <Button shape="round" className="home__plus" type="primary" onClick={this.handleClick}><span className="bold-me">+ Create</span></Button>
              </div>
              <Modal
                centered
                visible={this.state.modalIsOpen}
                onCancel={this.handleCancel}
                footer={[]}
                width="90vw"
              >
                <div className="container-fluid">
                  <div className="geosuggest-container">
                    <GeoSuggest invokeModalSearch onModalSearchSelect={this.onModalSearchSelect} />
                  </div>
                  <Input className="home__input-title" placeholder="Title" name="title" onChange={this.handleTitleInput} />
                  <input type="file" name="files" ref={this.inputRef} onChange={this.handleChange} multiple hidden/>
                  <div className="row justify-content-center">
                    <Button type="primary" onClick={this.handleUploadButtonClick} ghost><span className="bold-me">Upload Files</span></Button>
                  </div>
                  <MapContainer queryCoordinates={this.state.queryCoordinates} updateMarkers={this.updateMarkers}/>
                  <div className="row justify-content-center">
                    <Button className="home__submit-button" type="primary" loading={this.state.isFetching} onClick={this.handleSubmitButtonClick}><span className="bold-me">Submit</span></Button>
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
