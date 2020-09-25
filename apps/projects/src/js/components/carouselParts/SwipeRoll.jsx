import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSwipeable } from 'react-swipeable';
// https://github.com/FormidableLabs/react-swipeable
import { useDispatch } from 'react-redux';
import { toggleCarouselAuto } from '../../store/actions/statusActions';
import { FORWARD, BACKWARD, RATIO_SWITCH } from '../../shared/_constant';
import './SwipeRoll.scss';

const SwipeRoll = ({ rollCarousel }) => {
  const dispatch = useDispatch();

  const inLandscape = useRef(
    window.innerWidth / window.innerHeight >= RATIO_SWITCH
  );
  useEffect(() => {
    const syncRatio = () => {
      inLandscape.current =
        window.innerWidth / window.innerHeight >= RATIO_SWITCH;
    };
    window.addEventListener('resize', syncRatio);
    return () => window.removeEventListener('resize', syncRatio);
  }, []);

  const roll = useCallback(
    ({ dir }) => {
      if (
        (inLandscape.current && dir === 'Up') ||
        (!inLandscape.current && dir === 'Left')
      ) {
        rollCarousel(FORWARD);
        dispatch(toggleCarouselAuto(false));
      } else if (
        (inLandscape.current && dir === 'Down') ||
        (!inLandscape.current && dir === 'Right')
      ) {
        rollCarousel(BACKWARD);
        dispatch(toggleCarouselAuto(false));
      }
    },
    [rollCarousel, dispatch]
  );

  const swipeHandler = useSwipeable({
    onSwiped: roll,
    delta: 10,
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: true,
  });

  return <div className="swipe-blocker" {...swipeHandler} />;
};

SwipeRoll.propTypes = {
  rollCarousel: PropTypes.func,
};

export default SwipeRoll;
