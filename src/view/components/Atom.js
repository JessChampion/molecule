import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Sprite} from 'react-pixi';

const sprites = {
  plain: require('../../assets/bubble.png'),
  blue: require('../../assets/bubble-blue.png'),
  green: require('../../assets/bubble-green.png'),
};

const getSprite = (key) => {
  return sprites[key];
};

export default class Atom extends Component {
  render() {
    const {
      rotation, sprite, x, y
    } = this.props;
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
  rotation: PropTypes.number,
  sprite: PropTypes.oneOf(['plain', 'blue', 'green']),
  x: PropTypes.number,
  y: PropTypes.number
};
