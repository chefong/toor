import React, { Component } from 'react';
import { motion } from "framer-motion";
import { Frame } from "framer-motion";

const styles = {
  background: "white",
  borderRadius: '50%',
  borderWidth: '2px',
  borderColor: 'black',
  width: 150,
  height: 150,
  margin: "auto"
};

class LiveLoc extends Component {
  render(){
    return(
      <div>
      <motion.div
      style={styles}
      animate={{ rotate: 360 }}
      transition={{ duration: 2 }}
      />
      </div>
    )
  }
}

export default LiveLoc;
