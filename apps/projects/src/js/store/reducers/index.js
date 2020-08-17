import { combineReducers } from 'redux';
import projReducer from './projReducer';
import filterReducer from './filterReducer';

export default combineReducers({
  project: projReducer,
  filter: filterReducer,
});
