import { FILTER_PROJS } from '../../shared/_constant';

export default (state = { filtered: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case FILTER_PROJS:
      return { ...state, filtered: payload };
    default:
      return state;
  }
};
