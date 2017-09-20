import PropTypes from 'prop-types';
import * as R from 'ramda';
import React, {Component} from 'react';
import {connect} from 'react-redux';

import WorldView from './components/WorldView';
import MoleculeEngine from './engine/MoleculeEngine';
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

class World extends Component {

  constructor() {
    super();
    this.engine = new MoleculeEngine();
  }

  updateStateFromViewModel(props) {
    this.setState({atoms: getAtomsFromViewModel(props)});
  }

  componentWillUpdate(nextProps, nextState){

    this.engine.setAtoms(nextState.atoms);
  }


  componentWillMount() {
    this.updateStateFromViewModel(this.props);
  }

  componentDidMount() {
    const tick = () => {
      this.setState({atoms: this.engine.tick()});
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
    const {color, height, width} = config.stage;
    return (
      <WorldView color={color} height={height} width={width} atoms={atoms} interactive={true}/>
    );
  }
}

World.propTypes = {
  viewModel: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(World);