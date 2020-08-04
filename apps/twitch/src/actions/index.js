import streams from '../apis/streams';
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS
} from './actionTypes';
// use history object to navigate user to different pages upon action created
import history from '../history';

export const signIn = userId => {
  return { type: SIGN_IN, payload: userId };
};

export const signOut = () => {
  return { type: SIGN_OUT };
};

export const createStream = formValues => async (dispatch, getState) => {
  //> endpoint defined in db.json within the json server
  //> Requests following RESTful convention which json server does too
  const { data } = await streams.post('streams/', {
    ...formValues,
    userId: getState().auth.userId
  });
  dispatch({ type: CREATE_STREAM, payload: data });
  // navigate user back to '/' after stream created
  history.push('/');
};

export const fetchStreams = () => async dispatch => {
  const { data } = await streams.get('streams/');
  dispatch({ type: FETCH_STREAMS, payload: data });
};

export const fetchStream = id => async dispatch => {
  const { data } = await streams.get(`streams/${id}/`);
  dispatch({ type: FETCH_STREAM, payload: data });
};

export const editStream = (id, formValues) => async dispatch => {
  const { data } = await streams.patch(`streams/${id}/`, formValues);
  dispatch({ type: EDIT_STREAM, payload: data });
  history.push('/');
};

export const deleteStream = id => async dispatch => {
  // for delete, there is no 'data' in response, pass on id just for a record
  await streams.delete(`streams/${id}/`);
  dispatch({ type: DELETE_STREAM, payload: id });
  history.push('/');
};
