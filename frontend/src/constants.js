const marker = require('./assets/imgs/Marker.png');

const particlesOptions = {
  particles: {
    shape: {
      type: 'images',
      images: [
        {
          src: marker,
          height: 20,
          width: 20
        }
      ]
    },
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    },
    size: {
      value: 6,
      random: true,
      anim: {
        speed: 5.5,
        size_min: 3
      }
    },
    line_linked: {
      enable: false
    },
    move: {
      random: true,
      speed: 1,
      direction: "bottom",
      out_mode: "out"
    },
    color:  {
      value: "#33BEFF"
    }
  },
  interactivity: {
    events: {
      onclick: {
        enable: true,
        mode: "remove"
      }
    },
    modes: {
      remove: {
        particles_nb: 11
      }
    }
  }
}
const BASE_URL = "https://toor-backend.herokuapp.com";

export { BASE_URL, particlesOptions }