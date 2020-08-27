import { FETCH_PROJS } from '../../shared/_constant';

export default (state = {}, action) => {
  if (action.type === FETCH_PROJS) {
    return { ...action.payload };
  }
  return state;
};
