import React, { useCallback, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { FORWARD, BACKWARD, AUTOPLAY_DELAY } from '../../shared/_constant';
import './CarouselNav.scss';

const CarouselNav = ({ rollCarousel, counts, current, inLandscape }) => {
  const classBase = 'carousel-nav';
  const rollToUse = useCallback(
    direction => {
      rollCarousel(direction);
      setTouched(prev => prev + 1);
    },
    [rollCarousel]
  );

  const [auto, setAuto] = useState(true);
  /**
   * Roll prism if autoplay was enabled and delay was satisfied
   */
  const rollDelay = useSelector(state => state.status.carousel_autoroll_delay);
  useEffect(() => {
    let timer = null;
    if (auto) {
      timer = setTimeout(() => {
        rollCarousel(FORWARD);
      }, rollDelay);
    }
    return () => timer && clearTimeout(timer);
  }, [rollDelay, rollCarousel, auto]);

  /**
   * Setup timer and cancel previous timer for turning on autoplay on every
   * user interaction
   */
  const [touched, setTouched] = useState(0);
  useEffect(() => {
    let timer = null;
    if (touched > 0) {
      setAuto(false);
      timer = setTimeout(() => {
        setTouched(0);
      }, AUTOPLAY_DELAY);
    } else {
      setAuto(true);
    }
    return () => timer && clearTimeout(timer);
  }, [touched]);

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
        rollToUse(FORWARD);
      } else if (
        (!inLandscape && swipedInX && dX > tolerance) ||
        (inLandscape && !swipedInX && dY > tolerance)
      ) {
        rollToUse(BACKWARD);
      }
    },
    [inLandscape, rollToUse]
  );

  const dots = [];
  for (let i = 0; i < counts; i++) {
    dots.push(
      <li
        key={i}
        className={`${classBase}__sidebar__dot ${
          i === current ? `${classBase}__sidebar__dot--current` : ''
        }`}
      />
    );
  }
  return (
    <div className={classBase}>
      <div
        className={`${classBase}__hidden`}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      />
      <ul className={`${classBase}__sidebar`}>
        <li className={`${classBase}__sidebar__btn`}>
          <div className="btn prev" onClick={() => rollToUse(BACKWARD)} />
        </li>
        {dots}
        <li className={`${classBase}__sidebar__btn`}>
          <div className="btn next" onClick={() => rollToUse(FORWARD)} />
        </li>
      </ul>
    </div>
  );
};

CarouselNav.propTypes = {
  rollCarousel: PropTypes.func,
  counts: PropTypes.number,
  current: PropTypes.number,
  inLandscape: PropTypes.bool,
};

export default CarouselNav;
