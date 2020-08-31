import { hot } from 'react-hot-loader/root';
import React, { useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { FETCH_PROJS } from '../shared/_constant';
import { filterProjs } from '../store/actions/projActions';
import Filter from './Filter';
import Carousel from './Carousel';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = 'Projects | meetm.io';
  }, []);

  useEffect(() => {
    const getProjs = async () => {
      // const response = await fetch('http://localhost:8000/api/proj/');
      const response = await fetch('https://meetm.io/api/proj/');
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
