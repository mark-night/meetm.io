import {
  TOGGLE_FILTER_DROPDOWN,
  UPDATE_CAROUSEL_AUTOROLL_DELAY,
  AUTOROLL_DELAY_DEFAULT,
  TOGGLE_CAROUSEL_AUTO,
} from '../../shared/_constant';

export const toggleFilterDropdown = status => {
  return { type: TOGGLE_FILTER_DROPDOWN, payload: status };
};

export const updateCarouselAutorollDelay = delay => {
  delay = Math.max(delay, AUTOROLL_DELAY_DEFAULT);
  return { type: UPDATE_CAROUSEL_AUTOROLL_DELAY, payload: delay };
};

export const toggleCarouselAuto = status => {
  return { type: TOGGLE_CAROUSEL_AUTO, payload: status };
};
