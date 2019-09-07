import React, { Component } from 'react'
import ReactPlayer from 'react-player'

class AudioPlayer extends Component {
  // constructor(props) {
  //   super(props);
  //   state={
  //     url:""
  //   }
  // }

  render () {
    return <ReactPlayer controls={true}
     url={this.props.url}
     fileConfig={{ forceAudio: true }}
     width="500px"
     height="50px"
     playing />
  }
}

export default AudioPlayer;
