import * as R from 'ramda';

import store from '../store';

const addDefaultAnimations = R.assoc('animations', ['rotation']);
const addPlainSprite = R.assoc('sprite', 'plain');
const getDefaultViewModel = R.map(R.compose(addPlainSprite, addDefaultAnimations));

export const CREATE_VM = 'CREATE_VM';
export function createViewModel(people) {
  return {
    data: {viewModel: getDefaultViewModel(people)},
    type: CREATE_VM
  };
}

export const LOAD_DATA = 'LOAD_DATA';
export function loadData(data) {
  store.dispatch(createViewModel(data.people));
  return {
    data,
    type: LOAD_DATA
  };
}
