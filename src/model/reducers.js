import * as R from 'ramda';

import {LOAD_DATA} from './actions';

const getPeople = R.pathOr({}, ['data', 'people']);

const modelReducer = (state = {people: []}, action) => {
  switch (action.type) {
    case LOAD_DATA: {
      return {
        people: getPeople(action)
      };
    }
    // skip default
  }
  return state;
};

export default modelReducer;