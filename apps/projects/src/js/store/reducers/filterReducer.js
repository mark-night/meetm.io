import {
  UPDATE_FILTER_TERMS,
  UPDATE_FILTER_SELECTIONS,
  UPDATE_FILTER_FILTERS,
  FETCH_PROJS,
} from '../../shared/_constant';

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_PROJS:
      return { ...state, categories: payload.categories, tags: payload.tags };
    case UPDATE_FILTER_TERMS:
      return { ...state, terms: payload };
    case UPDATE_FILTER_SELECTIONS:
      return { ...state, selections: payload };
    case UPDATE_FILTER_FILTERS:
      return { ...state, filters: payload };
    default:
      return state;
  }
};
