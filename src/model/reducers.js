import * as R from 'ramda';

import {CREATE_VM, LOAD_DATA} from './actions';

const getPeople = R.pathOr({}, ['data', 'people']);
const getViewModel = R.pathOr({}, ['data', 'viewModel']);

const modelReducer = (state = {people: []}, action) => {
  // eslint-disable-next-line
  switch (action.type) {
    case CREATE_VM: {
      const vm = getViewModel(action);
      return {
        viewModel: vm,
        people: state.people
      };
    }
    case LOAD_DATA: {
      return {
        viewModel: state.viewModel,
        people: getPeople(action)
      };
    }
  }
  return state;
};

export default modelReducer;