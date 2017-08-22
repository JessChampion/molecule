import PropTypes from 'prop-types';
import * as R from 'ramda';
import React, {Component} from 'react';
import {connect} from 'react-redux';
// import pixi from 'pixi.js';
import {Stage, Sprite, VectorText} from 'react-pixi';

import Atom from './components/Atom';

const SPEED = 0.005;

const getStateProps = R.compose(R.objOf('atoms'), R.pathOr([], ['model', 'atoms']));
const mapStateToProps = (state) => getStateProps(state);

class World extends Component {
  constructor() {
    super();
    this.state = {rotation: 0};
  }

  componentDidMount() {
    const tick = () => {//This is where we will bind the animation
      // this.setState({rotation: this.state.rotation + Math.PI*SPEED});
      //Somehow call each atoms tick event
      requestAnimationFrame(tick);
    };
    tick();
  }

  renderAtom(id, sprite, pos) {
    return (<Atom key={id} sprite={sprite} x={pos} y={pos}/>);
  }

  render() {
    const atoms = this.props.atoms ? this.props.atoms : [];
    const content = atoms.map((person, index) => this.renderAtom(person.id, person.sprite, 100 * (index + 1)));
    return (
      <Stage backgroundColor={0xa08080} height={500} width={800} interactive={true}>
        {content}
      </Stage>
    );
  }
}

World.propTypes = {
  atoms: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(World);