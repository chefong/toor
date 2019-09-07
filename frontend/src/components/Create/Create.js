import React, { Component } from 'react';
import { Button } from 'antd';

class Create extends Component {
  inputRef = React.createRef();

  handleUploadButtonClick = () => {
    this.inputRef.current.click();
  }

  render() {
    return (
      <div className="container-fluid">
        <input type="file" name="files" ref={this.inputRef} onChange={this.props.handleChange} multiple hidden/>
        <div className="row justify-content-center">
          <Button type="primary" onClick={this.handleUploadButtonClick} ghost>Upload Files</Button>
        </div>
      </div>
    )
  }
}

export default Create;
