import React, { Component } from 'react'
import ReactPlayer from 'react-player'

const playerStyle={
  marginTop: '400px',
  position: 'absolute'
}

class AudioPlayer extends Component {
  render () {
    return <ReactPlayer
      controls={true}
      url={this.props.link}
      fileConfig={{ forceAudio: true }}
      width="80%"
      height="35px"
      style={playerStyle}
      playing
    />
  }
}

export default AudioPlayer;
