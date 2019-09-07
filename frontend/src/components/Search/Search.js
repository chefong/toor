import React, { Component } from 'react';
import { Input } from 'antd';

class Search extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Input placeholder="Search..." />
      </div>
    )
  }
}

export default Search;
