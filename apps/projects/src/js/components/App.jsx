import { hot } from 'react-hot-loader/root';
import React, { useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { FETCH_PROJS, FETCH_SOURCE } from '../shared/_constant';
import { filterProjs } from '../store/actions/projActions';
import Filter from './Filter';
import Carousel from './Carousel';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getProjs = async () => {
      const response = await fetch(FETCH_SOURCE);
      const projs = await response.json();
      // action only used once, don't bother creating an action creator
      dispatch({ type: FETCH_PROJS, payload: projs });
      dispatch(filterProjs());
    };
    getProjs();
  }, [dispatch]);

  return (
    <Fragment>
      <Filter />
      <Carousel />
    </Fragment>
  );
};

export default hot(App);
// export default App;
