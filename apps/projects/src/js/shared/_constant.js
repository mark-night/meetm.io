/**
 * ACTION TYPES
 */
export const FETCH_PROJS = 'FETCH_PROJS';
export const PICK_PROJ = 'PICK_PROJ';
export const FILTER_PROJS = 'FILTER_PROJS';
export const UPDATE_FILTER_TERMS = 'UPDATE_FILTER_TERMS';
export const UPDATE_FILTER_SELECTIONS = 'UPDATE_FILTER_SELECTIONS';
export const OPEN_FILTER_DROPDOWN = 'OPEN_FILTER_DROPDOWN';
export const FILTER_DROPDOWN_TOGGLED = 'FILTER_DROPDOWN_TOGGLED';

/**
 * SELECTION VALUES
 */
export const ALL = '__ALL__';

/**
 * CONSTANTS SHARED FROM SCSS
 * https://github.com/webpack-contrib/css-loader#auto
 */
import constants from '../../scss/global/.module.scss';
export const DUR_SLOW = parseInt(constants.dur_slow);
export const DUR_NORMAL = parseInt(constants.dur_normal);
export const DUR_FAST = parseInt(constants.dur_fast);
export const CLASS_FADE = constants.class_fade;
