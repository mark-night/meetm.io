import { hot } from 'react-hot-loader/root';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { FETCH_PROJS } from '../shared/_constant';
import Filter from './Filter';
import Carousel from './Carousel';

const App = () => {
  // hooks way to "connect" component to store
  const dispatch = useDispatch();

  useEffect(() => {
    const getProjs = async () => {
      const response = await fetch('http://localhost:8000/api/proj/');
      const projs = await response.json();
      // action only used once, don't bother creating an action creator
      dispatch({ type: FETCH_PROJS, payload: projs });
    };
    getProjs();
  }, [dispatch]);

  return (
    <div>
      <Filter />
      <Carousel />
    </div>
  );
};

export default hot(App);
