import { FILTER_PROJS, PICK_PROJ } from '../../shared/_constant';

export const filterProjs = (projs, filters) => {
  if (filters.length === 0 || projs.length === 0) {
    return { type: FILTER_PROJS, payload: projs };
  }
  projs = projs.filter(proj => {
    // assemble all parts into a single string to simplify searching
    const projStr = [
      proj.title,
      proj.category,
      ...proj.languages,
      ...proj.frameworks,
      ...proj.tools,
      ...proj.concepts,
      proj.desc_short,
      proj.desc_long,
    ]
      .join(' ')
      .toLowerCase();
    return filters.every(filter => projStr.includes(filter.toLowerCase()));
  });
  return { type: FILTER_PROJS, payload: projs };
};

export const pickProj = proj => {
  return { type: PICK_PROJ, payload: proj };
};
