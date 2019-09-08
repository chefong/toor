import React, { Component } from 'react';
import { message, Rate, Form, Input, Icon, Popover, Button, Alert, Tag } from 'antd';
import './AudioTour.css';
import {Redirect} from 'react-router-dom';
import MapContainer from '../MapContainer';
import Player from './AudioPlayer';
import MapNoMarkers from '../MapnoMarkers';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const BASE_URL = "http://3bd63842.ngrok.io";

class AudioTour extends Component {
  state = {
    isFetching: false,
    hasRated: false,
    isPopoverVisible: false,
    isPopoverLoading: false,
    currentIndex: 0
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

  handleRightClick = e => {
    e.preventDefault();
    const { link } = this.props.location.state;
    if (this.state.currentIndex < link.length - 1) {
      this.setState(prevState =>  ({ currentIndex: prevState.currentIndex + 1 }));
    }
  }

  handleLeftClick = e => {
    e.preventDefault();
    if (this.state.currentIndex > 0) {
      this.setState(prevState =>  ({ currentIndex: prevState.currentIndex - 1 }));
    }
  }

  render() {
    if (this.state.redirecting){
      return <Redirect push to="/home" />
    }
    let player = <Alert className="audio-tour-warning" type="warning" message="No audio tours available for this campus."/>;
    const { rating, school, title, link } = this.props.location.state;
    if (link && link.length != 0) {
      player = <Player link={link[this.state.currentIndex]} />
    }
    console.log(this.props.location.state.link)

    return (
      <div className="audio-tour-container">
        <Icon type="arrow-left" onClick={() => window.location.href = "/home"} className="iconArrow"/>
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
            <Tag color="geekblue" className="stay-updated" ghost>Click here to stay updated</Tag>
          </Popover>
        </div>
        <MapNoMarkers/>
        <div className="row justify-content-center">
          {player}
        </div>
        <div className="carouselDiv">
          <div className="row justify-content-center">
            <div className="left-arrow-container col-4">
              <Button type="primary" className="left-button" onClick={this.handleLeftClick}>
                <Icon className="left-arrow" type="caret-left" style={{ fontSize: '16px', color: '#FFFFFF' }} />
              </Button>
            </div>
            <div className="col-4">
              <p className="count">{this.state.currentIndex}</p>
            </div>
            <div className="col-4">
              <Button type="primary" className="right-button" onClick={this.handleRightClick}>
                <Icon classname="right-arrow" type="caret-right" style={{ fontSize: '16px', color: '#FFFFFF' }} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AudioTour;
