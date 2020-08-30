/**
 * ACTION TYPES
 */
export const FETCH_PROJS = 'FETCH_PROJS';
export const PICK_PROJ = 'PICK_PROJ';
export const FILTER_PROJS = 'FILTER_PROJS';
export const UPDATE_FILTER_TERMS = 'UPDATE_FILTER_TERMS';
export const UPDATE_FILTER_SELECTIONS = 'UPDATE_FILTER_SELECTIONS';
export const TOGGLE_FILTER_DROPDOWN = 'TOGGLE_FILTER_DROPDOWN';

/**
 * CONSTANTS SHARED FROM SCSS
 * https://github.com/webpack-contrib/css-loader#auto
 */
import constants from '../../scss/global/.module.scss';
export const DUR_SLOW = parseInt(constants.dur_slow);
export const DUR_NORMAL = parseInt(constants.dur_normal);
export const DUR_FAST = parseInt(constants.dur_fast);
export const CLASS_FADE = constants.class_fade;

/**
 * CAROUSEL PRISM
 */
export const POSE_FRONT = constants.pose_front;
export const POSE_UP = constants.pose_up;
export const POSE_DOWN = constants.pose_down;
const [a, b] = constants.ratio_switch.split('/');
export const RATIO_SWITCH = parseInt(a) / parseInt(b);

/**
 * CAROUSEL/SLIDESHOW PLAY DIRECTION
 */
export const FORWARD = 'FORWARD';
export const BACKWARD = 'BACKWARD';
