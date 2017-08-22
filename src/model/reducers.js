import * as R from 'ramda';

import {CREATE_VM, LOAD_DATA} from './actions';

const getPeople = R.pathOr({}, ['data', 'people']);
const getAtoms = R.pathOr({}, ['data', 'atoms']);

const modelReducer = (state = {people: []}, action) => {
  // eslint-disable-next-line
  switch (action.type) {
    case CREATE_VM: {
      return {
        atoms: getAtoms(action),
        people: state.people
      };
    }
    case LOAD_DATA: {
      return {
        atoms: state.atoms,
        people: getPeople(action)
      };
    }
  }
  return state;
};

export default modelReducer;