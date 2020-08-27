import { TOGGLE_FILTER_DROPDOWN } from '../../shared/_constant';

export default (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_FILTER_DROPDOWN:
      return { ...state, filterDropdown_open: payload };
    default:
      return state;
  }
};
