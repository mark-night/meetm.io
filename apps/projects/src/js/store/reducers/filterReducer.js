import {
  UPDATE_FILTER_TERMS,
  UPDATE_FILTER_SELECTIONS,
  FETCH_PROJS,
  OPEN_FILTER_DROPDOWN,
  FILTER_DROPDOWN_TOGGLED,
} from '../../shared/_constant';

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_PROJS:
      return { ...state, tags: payload.tags };
    case UPDATE_FILTER_TERMS:
      return { ...state, terms: payload };
    case UPDATE_FILTER_SELECTIONS:
      return { ...state, selections: payload };
    case OPEN_FILTER_DROPDOWN:
      return { ...state, open: payload };
    case FILTER_DROPDOWN_TOGGLED:
      return { ...state, toggled: true };
    default:
      return state;
  }
};
