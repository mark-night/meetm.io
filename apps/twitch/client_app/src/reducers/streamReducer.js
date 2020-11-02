import _ from 'lodash';
import {
  CREATE_STREAM,
  EDIT_STREAM,
  DELETE_STREAM,
  FETCH_STREAM,
  FETCH_STREAMS
} from '../actions/actionTypes';

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_STREAM:
    case CREATE_STREAM:
    case EDIT_STREAM:
      return { ...state, [payload.id]: payload };
    case DELETE_STREAM:
      // when deleting, action creator record id right as payload
      return _.omit(state, payload);
    case FETCH_STREAMS:
      return { ...state, ..._.mapKeys(payload, 'id') };
    default:
      return state;
  }
};
