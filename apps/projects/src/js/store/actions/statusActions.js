import { TOGGLE_FILTER_DROPDOWN } from '../../shared/_constant';

export const toggleFilterDropdown = status => {
  return { type: TOGGLE_FILTER_DROPDOWN, payload: status };
};
