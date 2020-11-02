import { combineReducers } from 'redux';
import metaReducer from './metaReducer';
import projReducer from './projReducer';
import filterReducer from './filterReducer';
import statusReducer from './statusReducer';

export default combineReducers({
  meta: metaReducer,
  chosen: projReducer,
  filter: filterReducer,
  status: statusReducer,
});
