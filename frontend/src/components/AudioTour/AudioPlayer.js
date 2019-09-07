import React, { Component } from 'react'
import ReactPlayer from 'react-player'

const playerStyle={
  marginLeft: '16px',
  marginRight: '16px',
}

class AudioPlayer extends Component {
  render () {
    return <ReactPlayer controls={true}
     url={this.props.link}
     fileConfig={{ forceAudio: true }}
     width="90%"
     height="50px"
     style={playerStyle}
     playing />
  }
}

export default AudioPlayer;
