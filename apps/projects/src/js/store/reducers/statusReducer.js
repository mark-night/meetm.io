import {
  TOGGLE_FILTER_DROPDOWN,
  UPDATE_CAROUSEL_AUTOROLL_DELAY,
} from '../../shared/_constant';

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_FILTER_DROPDOWN:
      return { ...state, filterDropdown_open: payload };
    case UPDATE_CAROUSEL_AUTOROLL_DELAY:
      return { ...state, carousel_autoroll_delay: payload };
    default:
      return state;
  }
};
