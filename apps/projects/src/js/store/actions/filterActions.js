import {
  UPDATE_FILTER_TERMS,
  UPDATE_FILTER_SELECTIONS,
  UPDATE_FILTER_FILTERS,
  NONE,
  ALL,
} from '../../shared/_constant';
import { filterProjs } from './projActions';
import { parseStrArr } from '../../shared/_utility';

export const updateFilterTerms = term => (dispatch, getState) => {
  const terms = parseStrArr(term.split(','));
  dispatch({ type: UPDATE_FILTER_TERMS, payload: terms });

  updateFiltersAndFilterProjs(terms, dispatch, getState());
};

export const updateFilterSelections = selections => (dispatch, getState) => {
  if (selections[0] === NONE) {
    selections = [];
  } else if (selections[0] === ALL) {
    selections.shift();
  }
  selections = parseStrArr(selections);
  dispatch({ type: UPDATE_FILTER_SELECTIONS, payload: selections });

  updateFiltersAndFilterProjs(selections, dispatch, getState());
};

const updateFiltersAndFilterProjs = (updateWith, dispatch, state) => {
  const terms = state.filter.terms || [];
  const selections = state.filter.selections || [];
  const filters = parseStrArr([...terms, ...selections, ...updateWith]);
  dispatch({ type: UPDATE_FILTER_FILTERS, payload: filters });

  let all = state.project.all || [];
  dispatch(filterProjs(all, filters));
};
