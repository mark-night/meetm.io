import {
  UPDATE_FILTER_TERMS,
  UPDATE_FILTER_SELECTIONS,
  CLEAR_FILTER_SELECTIONS,
} from '../../shared/_constant';
import { filterProjs } from './projActions';
import { parseStrArr, removeArrFromArr } from '../../shared/_utility';

export const updateFilterTerms = term => dispatch => {
  const terms = parseStrArr(term.split(','));
  dispatch({ type: UPDATE_FILTER_TERMS, payload: terms });
  dispatch(filterProjs());
};

export const clearFilterSelections = () => dispatch => {
  dispatch({ type: CLEAR_FILTER_SELECTIONS });
  dispatch(filterProjs());
};

export const updateFilterSelections = (selections, add = true) => (
  dispatch,
  getState
) => {
  const state = getState();
  const excludedTags = ['Category']; // ManyToOne fields

  selections = typeof selections === 'string' ? [selections] : selections;
  let prevSelections = state.filter.selections;
  let newSelections;

  if (add) {
    prevSelections = parseForExclusion(
      selections,
      prevSelections,
      excludedTags,
      state
    );
    newSelections = [...prevSelections, ...selections];
  } else {
    newSelections = removeArrFromArr(selections, prevSelections);
  }

  newSelections = parseStrArr(newSelections);
  dispatch({ type: UPDATE_FILTER_SELECTIONS, payload: newSelections });
  dispatch(filterProjs());
};

const parseForExclusion = (selections, prevSelections, excludedTags, state) => {
  const tags = state.meta.tags;
  for (const exclusion of excludedTags) {
    const tagsToCheck = tags[exclusion] || [];
    tagsToCheck.forEach(tag => {
      if (selections.includes(tag)) {
        // found one, remove all
        prevSelections = removeArrFromArr(tagsToCheck, prevSelections);
      }
    });
  }
  return prevSelections;
};
