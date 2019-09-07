import React, { Component } from 'react';
import { message, Rate, Form, Input, Icon, Popover, Button } from 'antd';
import './AudioTour.css';
import {Redirect} from 'react-router-dom';
import MapContainer from '../MapContainer';
import Player from './AudioPlayer';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const BASE_URL = "http://9db5910f.ngrok.io";

class AudioTour extends Component {
  state = {
    isFetching: false,
    hasRated: false,
    isPopoverVisible: false,
    isPopoverLoading: false
  }

  handleVisibleChange = isPopoverVisible => {
    this.setState({ isPopoverVisible });
  };

  handleRate = value => {
    if (!this.state.hasRated) {
      const formData = new FormData();
      formData.append("id", this.props.match.params.id);
      formData.append("rating", value);

      fetch(`${BASE_URL}/changeRating`, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          message.success("Your rating has successfully been recorded!", 3);
          this.setState({ hasRated: true });
        })
        .catch(error => {
          console.error(error);
          message.error("Something went wrong while trying to submit your rating.", 3);
        })
    }
  }

  handlePopoverSubmit = e => {
    e.preventDefault();
    this.setState({ isPopoverLoading: true });

    const phoneNumber = "1" + e.target.phone.value;
    const formData = new FormData();
    formData.append('phoneNumber', phoneNumber);
    formData.append('school', this.props.location.state.school);

    fetch(`${BASE_URL}/addPhoneNumbers`, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        message.success("You have been successfully subscribed, stay tuned!");
        this.setState({ isPopoverLoading: false });
      })
      .catch(error => {
        console.error(error);
        message.error("Something went wrong when trying to submit your phone number.");
        this.setState({ isPopoverLoading: false });
      })
  }

  redirect = () => {
    this.setState({
      redirecting: true
    })
  }

  render() {
    if (this.state.redirecting){
      return <Redirect push to="/home" />
    }

    const { rating, school, title } = this.props.location.state;

    return (
      <div className="audio-tour-container">
        <Icon type="arrow-left" onClick={this.redirect} className="iconArrow"/>
        <div className="row">
          <p className="schoolTitle">{school}</p>
        </div>
        <div className="Title">
          <p className="mainTitle">{title}</p>
        </div>
        <div className="rate-container row">
          <Rate defaultValue={rating || 0} disabled={this.state.hasRated} className="audio-tour__rate" onChange={this.handleRate} />
        </div>
        <div className="phone-container">
          <Popover
            content={
              <Form onSubmit={this.handlePopoverSubmit}>
                <Form.Item>
                  <p className="popover-description">Subscribe to get SMS updates when new tours get posted for this campus!</p>
                  <Input name="phone" addonBefore="+1" prefix={<Icon type="phone" className="contact-icon" style={{ color: 'rgba(0,0,0,.25)' }} />} />
                </Form.Item>
                <Form.Item>
                  <div className="submit-phone-container">
                    <Button type="primary" htmlType="submit" id="submit-phone" loading={this.state.isPopoverLoading}>Submit</Button>
                  </div>
                </Form.Item>
              </Form>
            }
            title="Stay Updated"
            trigger="click"
            placement="bottom"
            visible={this.state.isPopoverVisible}
            onVisibleChange={this.handleVisibleChange}
          >
            Interested in staying updated?
          </Popover>
        </div>
        {/* Audio player */}
         < Player link={this.props.location.state.link[0]} />
        <div className="mapHolder">
          <MapContainer/>
        </div>
        <div className="carouselDiv">
          <Icon type="left-circle" />
          <Icon type="right-circle" />
        </div>
        {/* <div className="carousel-container row justify-content-center">
          <Carousel>
            <div>
              <img src="assets/1.jpeg" />
              <p className="legend">Legend 1</p>
            </div>
            <div>
              <img src="assets/2.jpeg" />
              <p className="legend">Legend 2</p>
            </div>
            <div>
              <img src="assets/3.jpeg" />
              <p className="legend">Legend 3</p>
            </div>
          </Carousel>
        </div> */}
      </div>
    )
  }
}

export default AudioTour;
