// import { hot } from 'react-hot-loader/root';
import React, { useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { FETCH_PROJS, FETCH_SOURCE, FILTER_PROJS } from '../shared/_constant';
import { resizeObserver } from '../shared/_observers';
import Filter from './Filter';
import Carousel from './Carousel';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(FETCH_SOURCE)
      .then(response => response.json())
      .then(projs => {
        // pollute filtered first so message for nothing matched won't show on
        // initial load
        dispatch({ type: FILTER_PROJS, payload: projs.projects });
        dispatch({ type: FETCH_PROJS, payload: projs });
      });
  }, [dispatch]);

  /**
   * fix helper for vh/vw calculation
   * https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
   */
  useEffect(() => {
    const html = document.documentElement;
    resizeObserver.observe(html);
    return () => resizeObserver.unobserve(html);
  }, []);

  return (
    <Fragment>
      <Filter />
      <Carousel />
    </Fragment>
  );
};

// export default hot(App);
export default App;
