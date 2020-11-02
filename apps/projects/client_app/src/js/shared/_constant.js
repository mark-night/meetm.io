/**
 * PATH FOR MEDIA/META SOURCE
 */
export const MEDIA_ROOT = '';
export const FETCH_SOURCE = '/api/proj/';

/**
 * IMAGE USABLE WIDTHS
 */
export const IMG_WIDTHS = {
  landscape: [600, 700, 800, 900, 1024, 1200, 1400, 1600, 1800, 2048],
  portrait: [300, 400, 500, 600, 700, 800],
};

/**
 * ACTION TYPES
 */
export const FETCH_PROJS = 'FETCH_PROJS';
export const PICK_PROJ = 'PICK_PROJ';
export const FILTER_PROJS = 'FILTER_PROJS';
export const UPDATE_FILTER_TERMS = 'UPDATE_FILTER_TERMS';
export const UPDATE_FILTER_SELECTIONS = 'UPDATE_FILTER_SELECTIONS';
export const CLEAR_FILTER_SELECTIONS = 'CLEAR_FILTER_SELECTIONS';
export const TOGGLE_FILTER_DROPDOWN = 'TOGGLE_FILTER_DROPDOWN';
export const TOGGLE_CAROUSEL_AUTOPLAY = 'TOGGLE_CAROUSEL_AUTOPLAY';
export const UPDATE_CAROUSEL_AUTOROLL_DELAY = 'UPDATE_CAROUSEL_AUTOROLL_DELAY';

/**
 * CONSTANTS SHARED FROM SCSS
 * https://github.com/webpack-contrib/css-loader#auto
 */
import constants from '../../scss/global/.module.scss';
export const DUR_SLOW = parseInt(constants.dur_slow);
export const DUR_NORMAL = parseInt(constants.dur_normal);
export const DUR_FAST = parseInt(constants.dur_fast);

/**
 * CAROUSEL PRISM
 */
const [a, b] = constants.ratio_switch.split('/');
export const RATIO_NUMERATOR = parseInt(a);
export const RATIO_DENOMINATOR = parseInt(b);
export const RATIO_SWITCH = RATIO_NUMERATOR / RATIO_DENOMINATOR;
export const POSE_CURRENT = constants.pose_current;
export const POSE_PREV = constants.pose_prev;
export const POSE_NEXT = constants.pose_next;
// how long in ms each slide should be displayed
export const SLIDE_DURATION = 3000;
// default time to wait in ms before auto roll prism
export const AUTOROLL_DELAY_DEFAULT = 5000;
// how long in ms to wait before entering auto play
export const AUTOPLAY_DELAY = 15000;
export const TOGGLE_CAROUSEL_AUTO = 'TOGGLE_CAROUSEL_AUTO';

/**
 * CAROUSEL/SLIDESHOW PLAY DIRECTION
 */
export const FORWARD = 'FORWARD';
export const BACKWARD = 'BACKWARD';
