import {
  UPDATE_FILTER_TERMS,
  UPDATE_FILTER_SELECTIONS,
  UPDATE_FILTER_FILTERS,
  NONE,
  ALL,
} from '../../shared/_constant';
import { filterProjs } from './projActions';
import { parseStrArr, removeArrFromArr } from '../../shared/_utility';

export const updateFilterTerms = term => (dispatch, getState) => {
  const terms = parseStrArr(term.split(','));
  dispatch({ type: UPDATE_FILTER_TERMS, payload: terms });

  updateFiltersAndFilterProjs(terms, dispatch, getState());
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

  updateFiltersAndFilterProjs(selections, dispatch, state);
};

const updateFiltersAndFilterProjs = (updateWith, dispatch, state) => {
  const terms = state.filter.terms || [];
  const selections = state.filter.selections || [];
  const filters = parseStrArr([...terms, ...selections, ...updateWith]);
  dispatch({ type: UPDATE_FILTER_FILTERS, payload: filters });

  let all = state.project.all || [];
  dispatch(filterProjs(all, filters));
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
    } else if (selections === NONE) {
      selections = [];
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
