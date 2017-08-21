import { combineReducers, createStore } from 'redux';
import modelReducer from './model/reducers';

const rootReducer = combineReducers({
  model: modelReducer,
});
const store = createStore(rootReducer);

store.subscribe(() => {
  // Log the state whenever the store changes.
  // eslint-disable-next-line no-console
  console.log(store.getState());
});

export default store;
