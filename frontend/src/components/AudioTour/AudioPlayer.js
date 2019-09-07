import React, { Component } from 'react'
import ReactPlayer from 'react-player'
import './AudioPlayer.css'

class AudioPlayer extends Component {
  render () {
    return <ReactPlayer 
     id="audio-player"
     controls={true}
     url='http://www.hochmuth.com/mp3/Haydn_Cello_Concerto_D-1.mp3' 
     fileConfig={{ forceAudio: true }}
     width="90%"
     height="50px"
     playing />
  }
}

export default AudioPlayer;