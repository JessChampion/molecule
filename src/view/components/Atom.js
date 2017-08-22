import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Sprite} from 'react-pixi';

const sprites = {
  plain: require('../../assets/bubble.png'),
  blue: require('../../assets/bubble-blue.png'),
  green: require('../../assets/bubble-green.png'),
};
const SPEED = 0.005;

const getSprite = (key) => {
  return sprites[key];
};

export default class Atom extends Component {
  constructor(props) {
    super(props);
    this.state = { //is it ok to use local state like this in redux - ie isolated local state
      rotation: 0
    };
  }

  //
  // I want to be able to call each atoms tick method from the world tick event.
  tick() {
    this.setState((state) => {
      return {rotation: state.rotation + Math.PI * SPEED};
    });
  }

  render() {
    const {
      sprite, x, y
    } = this.props;
    const {rotation} = this.state;
    const image = getSprite(sprite);
    return (
      <Sprite
        image={image}
        rotation={rotation}
        x={x}
        y={y}
      />
    );
  }
}

Atom.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  sprite: PropTypes.oneOf(['plain', 'blue', 'green'])
};
