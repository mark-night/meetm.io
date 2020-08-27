import { FILTER_PROJS, PICK_PROJ } from '../../shared/_constant';

export const filterProjs = () => (dispatch, getState) => {
  const state = getState();
  let projs = state.meta.projects || [];
  const terms = state.filter.terms || [];
  const selections = state.filter.selections || [];

  if (projs.length === 0) {
    // Either failed fetching projects meta data, or filterProjs() was called too
    // early (within terms update)
    return;
  }

  if (selections.length === 0 && terms.length === 0) {
    dispatch({ type: FILTER_PROJS, payload: projs });
    return;
  }

  // filter against selections
  projs = projs.filter(proj => {
    const projTags = [
      proj.category,
      ...proj.languages,
      ...proj.frameworks,
      ...proj.tools,
      ...proj.concepts,
    ];
    return selections.every(selection => projTags.includes(selection));
  });

  // filter against terms
  projs = projs.filter(proj => {
    // assemble all parts into a single string to simplify searching
    // check after lower cased to make it case insensitive
    const projStr = [proj.title, proj.desc_short, proj.desc_long]
      .join(' ')
      .toLowerCase();
    return terms.every(term => projStr.includes(term.toLowerCase()));
  });

  dispatch({ type: FILTER_PROJS, payload: projs });
};

export const pickProj = proj => {
  return { type: PICK_PROJ, payload: proj };
};
