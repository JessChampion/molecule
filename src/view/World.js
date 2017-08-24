import PropTypes from 'prop-types';
import * as R from 'ramda';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Stage} from 'react-pixi';

import Atom from './components/Atom';
import * as animations from './animations';
import {config} from './config';
import {randomInt} from './utils';

const getStateProps = R.compose(R.objOf('viewModel'), R.pathOr([], ['model', 'viewModel']));
const mapStateToProps = (state) => getStateProps(state);

const initialiseSpriteValues = R.applySpec({
  x: randomInt(config.stage.padding, config.stage.width - config.stage.padding),
  y: randomInt(config.stage.padding, config.stage.height - config.stage.padding),
  rotation: randomInt(0, 1)
});
const emptyObjectWithKey = R.flip(R.objOf, null);
const emptyObjectFromKeys = R.compose(R.mergeAll, R.map(emptyObjectWithKey));
const getSpriteValues = R.compose(initialiseSpriteValues, emptyObjectFromKeys, R.prop('animations'));
const getValuesFromModel = R.pickAll(['id', 'sprite']);
const getAtom = R.converge(R.merge, [getValuesFromModel, getSpriteValues]);
const processModel = R.map(getAtom);
const getAtomsFromViewModel = R.compose(processModel, R.pathOr([], ['viewModel']));

const applyAnimationToAtom = R.evolve({
  rotation: animations.rotation
});
const applyAnimations = R.map(applyAnimationToAtom);
const updateAnimationState = R.converge(R.assoc('atoms'), [R.compose(applyAnimations, R.prop('atoms')), R.identity]);

const omitId = R.omit(['id']);
const renderAtom = (atom) => (<Atom key={atom.id}  {...omitId(atom)} />);

class World extends Component {

  updateStateFromViewModel(props) {
    this.setState({atoms: getAtomsFromViewModel(props)});
  }

  componentWillMount() {
    this.updateStateFromViewModel(this.props);
  }

  componentDidMount() {
    const tick = () => {
      this.setState(updateAnimationState(this.state));
      requestAnimationFrame(tick);
    };
    tick();
  }

  componentWillReceiveProps(nextProps) {
    //when state changes
    console.log(nextProps);
    this.updateStateFromViewModel(nextProps);
  }

  render() {
    const atoms = this.state && this.state.atoms ? this.state.atoms : [];
    const content = atoms.map(renderAtom);
    const {color, height, width} = config.stage;
    return (
      <Stage backgroundColor={color} height={height} width={width} interactive={true}>
        {content}
      </Stage>
    );
  }
}

World.propTypes = {
  viewModel: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(World);