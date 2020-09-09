import {
  TOGGLE_FILTER_DROPDOWN,
  UPDATE_CAROUSEL_AUTOROLL_DELAY,
  TOGGLE_CAROUSEL_AUTO,
} from '../../shared/_constant';

export default (
  state = { filterDropdown_open: false, carousel_auto: true },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_FILTER_DROPDOWN:
      return { ...state, filterDropdown_open: payload };
    case UPDATE_CAROUSEL_AUTOROLL_DELAY:
      return { ...state, carousel_autoroll_delay: payload };
    case TOGGLE_CAROUSEL_AUTO:
      return { ...state, carousel_auto: payload };
    default:
      return state;
  }
};
