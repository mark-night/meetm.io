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
 * CAROUSEL CARD POSITIONS
 */
export const CENTER = constants.carousel_center;
export const PREV = constants.carousel_prev;
export const NEXT = constants.carousel_next;
export const OFF_PREV = constants.carousel_off_prev;
export const OFF_NEXT = constants.carousel_off_next;

/**
 * CAROUSEL/SLIDESHOW PLAY DIRECTION
 */
export const FORWARD = 'FORWARD';
export const BACKWARD = 'BACKWARD';
