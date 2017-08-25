import PropTypes from 'prop-types';
import * as R from 'ramda';
import React, {Component} from 'react';
import {Stage} from 'react-pixi';

import Atom from './Atom';

const omitId = R.omit(['id']);
const renderAtom = (atom) => (<Atom key={atom.id}  {...omitId(atom)} />);

export default class WorldView extends Component {
  render() {
    const {atoms, color, height, width} = this.props;
    const content = atoms.map(renderAtom);
    return (
      <Stage backgroundColor={color} height={height} width={width} interactive={true}>
        {content}
      </Stage>
    );
  }
}

WorldView.propTypes = {
  atoms: PropTypes.array,
  // atoms: PropTypes.arrayOf(PropTypes.shape({
  //   id: PropTypes.number.isRequired,
  //   sprite: PropTypes.string.isRequired,
  //   x: PropTypes.number.isRequired,
  //   y: PropTypes.number.isRequired,
  //   rotation: PropTypes.number
  // })),
  color: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number
};