import {
  UPDATE_FILTER_TERMS,
  UPDATE_FILTER_SELECTIONS,
  OPEN_FILTER_DROPDOWN,
  ALL,
} from '../../shared/_constant';
import { filterProjs } from './projActions';
import { parseStrArr, removeArrFromArr } from '../../shared/_utility';

export const openFilterDropdown = open => {
  return { type: OPEN_FILTER_DROPDOWN, payload: open };
};

export const updateFilterTerms = term => dispatch => {
  const terms = parseStrArr(term.split(','));
  dispatch({ type: UPDATE_FILTER_TERMS, payload: terms });
  dispatch(filterProjs());
};

export const updateFilterSelections = (selections, add = true) => (
  dispatch,
  getState
) => {
  const state = getState();
  const excludedTags = ['Category']; // ManyToOne fields

  selections = convertStringSelections(selections, state, excludedTags);
  let prevSelections = state.filter.selections || [];
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

const convertStringSelections = (selections, state, excludedTags) => {
  if (typeof selections === 'string') {
    if (selections === ALL) {
      const tags = state.filter.tags || {};
      const allTags = [];
      Object.keys(tags).forEach(tag => {
        if (!excludedTags.includes(tag)) {
          allTags.push(...tags[tag]);
        }
      });
      selections = [...allTags];
    } else {
      selections = [selections];
    }
  }
  return selections;
};

const parseForExclusion = (selections, prevSelections, excludedTags, state) => {
  const tags = state.filter.tags || {};
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
