import React, { Component } from 'react'
import ReactPlayer from 'react-player'

class AudioPlayer extends Component {
  render () {
    return <ReactPlayer controls={true}
     url='http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3'
     fileConfig={{ forceAudio: true }}
     width="500px"
     height="50px"
     playing />
  }
}

export default AudioPlayer;
