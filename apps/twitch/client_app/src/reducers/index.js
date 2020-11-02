import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';

export default combineReducers({
  auth: authReducer,
  //> key must be 'form', required by redux-form
  form: reduxFormReducer,
  streams: streamReducer
});
