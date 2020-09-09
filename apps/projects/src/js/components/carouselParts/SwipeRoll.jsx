import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toggleCarouselAuto } from '../../store/actions/statusActions';
import { FORWARD, BACKWARD } from '../../shared/_constant';
import './SwipeRoll.scss';

const SwipeRoll = ({ inLandscape, rollCarousel }) => {
  const dispatch = useDispatch();

  /**
   * pointer (mouse & touch) handlers
   */
  const downCoordinate = useRef([null, null]);
  const handlePointerDown = e => {
    e.preventDefault();
    downCoordinate.current = [e.clientX, e.clientY];
  };
  const handlePointerUp = useCallback(
    e => {
      const tolerance = 10;
      const dX = e.clientX - downCoordinate.current[0];
      const dY = e.clientY - downCoordinate.current[1];
      const swipedInX = Math.abs(dX) >= Math.abs(dY);
      if (
        (!inLandscape && swipedInX && dX < -tolerance) ||
        (inLandscape && !swipedInX && dY < -tolerance)
      ) {
        rollCarousel(FORWARD);
        dispatch(toggleCarouselAuto(false));
      } else if (
        (!inLandscape && swipedInX && dX > tolerance) ||
        (inLandscape && !swipedInX && dY > tolerance)
      ) {
        rollCarousel(BACKWARD);
        dispatch(toggleCarouselAuto(false));
      }
    },
    [inLandscape, rollCarousel, dispatch]
  );

  return (
    <div
      className="swipe-blocker"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    />
  );
};

SwipeRoll.propTypes = {
  inLandscape: PropTypes.bool,
  rollCarousel: PropTypes.func,
};

export default SwipeRoll;
