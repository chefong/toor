import React, { Component } from 'react';
import { Rate } from 'antd';
import './Item.css';



class Item extends Component {
  render() {
    return (
      <div className="item-container">
        <p className="item__location">{this.props.school}</p>
        <p className="item__title">{this.props.title}</p>
        <Rate className="item__rate" disabled defaultValue={this.props.rating} />
      </div>
    )
  }
}

export default Item;
