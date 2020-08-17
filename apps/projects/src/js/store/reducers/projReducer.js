import { FETCH_PROJS, PICK_PROJ, FILTER_PROJS } from '../../shared/_constant';

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_PROJS:
      return { ...state, all: payload.projects };
    case FILTER_PROJS:
      return { ...state, filtered: payload };
    case PICK_PROJ:
      return { ...state, picked: payload };
    default:
      return state;
  }
};