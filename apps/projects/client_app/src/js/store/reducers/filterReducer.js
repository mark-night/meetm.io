import {
  UPDATE_FILTER_TERMS,
  UPDATE_FILTER_SELECTIONS,
  CLEAR_FILTER_SELECTIONS,
} from '../../shared/_constant';

export default (state = { terms: [], selections: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_FILTER_TERMS:
      return { ...state, terms: payload };
    case UPDATE_FILTER_SELECTIONS:
      return { ...state, selections: payload };
    case CLEAR_FILTER_SELECTIONS:
      return { ...state, selections: [] };
    default:
      return state;
  }
};
