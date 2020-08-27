import {
  UPDATE_FILTER_TERMS,
  UPDATE_FILTER_SELECTIONS,
} from '../../shared/_constant';

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_FILTER_TERMS:
      return { ...state, terms: payload };
    case UPDATE_FILTER_SELECTIONS:
      return { ...state, selections: payload };
    default:
      return state;
  }
};
