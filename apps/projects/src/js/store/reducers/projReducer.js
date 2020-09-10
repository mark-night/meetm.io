import { PICK_PROJ, FILTER_PROJS } from '../../shared/_constant';

export default (state = { filtered: [], picked: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case FILTER_PROJS:
      return { ...state, filtered: payload };
    case PICK_PROJ:
      return { ...state, picked: payload };
    default:
      return state;
  }
};
