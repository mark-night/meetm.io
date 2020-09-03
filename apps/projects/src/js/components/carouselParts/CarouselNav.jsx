import React, { useCallback, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { FORWARD, BACKWARD, AUTOPLAY_DELAY } from '../../shared/_constant';
import './CarouselNav.scss';

const CarouselNav = ({ rollCarousel, counts, current, inLandscape }) => {
  const classBase = 'carousel-nav';
  const rollDelay = useSelector(state => state.status.carousel_autoroll_delay);
  const rollDelayed = useRef(0); // how long of the scheduled delay has passed
  const rollDelayProgressDOM = useRef(null);
  const autoDelayProgressDOM = useRef(null);
  const [auto, setAuto] = useState(true);
  const rollToUse = useCallback(
    direction => {
      rollCarousel(direction);
      setAuto(false);
    },
    [rollCarousel]
  );

  /**
   * At every roll (auto or manual), reset roll delay progress
   */
  useEffect(() => {
    rollDelayed.current = 0;
    rollDelayProgressDOM.current.style.setProperty('--progress', '0');
  }, [current]);

  /**
   * On every roll or auto change, if auto is on, schedule next auto roll and
   * setup delay progress refresh.
   */
  useEffect(() => {
    let rollDelayTimer = null;
    let rollDelayProgressTimer = null;
    let rollDelayProgressIncrease = 0;
    const start = Date.now();
    if (auto) {
      // setup roll delay progress render
      rollDelayProgressTimer = setInterval(() => {
        rollDelayProgressIncrease = Date.now() - start;
        const progress = Math.min(
          1,
          (Date.now() - start + rollDelayed.current) / rollDelay
        );
        rollDelayProgressDOM.current.style.setProperty(
          '--progress',
          progress.toString()
        );
      }, 1000 / 30);
      // schedule next auto roll
      rollDelayTimer = setTimeout(() => {
        rollCarousel(FORWARD);
      }, rollDelay - rollDelayed.current);
    }
    return () => {
      if (rollDelayTimer) clearTimeout(rollDelayTimer);
      if (rollDelayProgressTimer) {
        // roll delay progressed
        clearInterval(rollDelayProgressTimer);
        rollDelayed.current += rollDelayProgressIncrease;
      }
    };
  }, [current, rollDelay, rollCarousel, auto]);

  /**
   * At each auto change:
   *  - If auto enabled, reset delay progress.
   *  - If auto disabled, schedule next turn on and setup delay progress refresh.
   */
  useEffect(() => {
    let autoDelayTimer = null;
    let progressTimer = null;
    if (auto) {
      autoDelayProgressDOM.current.style.setProperty('--ring-progress', '0');
    } else {
      // auto delay progress refresh
      const start = Date.now();
      progressTimer = setInterval(() => {
        const progress = Math.min(1, (Date.now() - start) / AUTOPLAY_DELAY);
        autoDelayProgressDOM.current.style.setProperty(
          '--ring-progress',
          progress.toString()
        );
      }, 1000 / 30);
      // auto delay schedule
      autoDelayTimer = setTimeout(() => setAuto(true), AUTOPLAY_DELAY);
    }
    return () => {
      if (progressTimer) clearInterval(progressTimer);
      if (autoDelayTimer) clearTimeout(autoDelayTimer);
    };
  }, [auto, current, rollCarousel]);

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

  const dotsJSX = [];
  for (let i = 0; i < counts; i++) {
    dotsJSX.push(
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
      <div //mainly for touch interaction
        className={`${classBase}__hidden`}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      />
      <ul className={`${classBase}__sidebar`}>
        <div // progress for next auto roll
          className={`${classBase}__sidebar__progress`}
          ref={rollDelayProgressDOM}
        />
        <li className={`${classBase}__sidebar__btn`}>
          <div className="btn prev" onClick={() => rollToUse(BACKWARD)} />
        </li>
        {dotsJSX}
        <li className={`${classBase}__sidebar__btn`}>
          <div className="btn next" onClick={() => rollToUse(FORWARD)} />
        </li>
        <li className={`${classBase}__sidebar__switch`}>
          <div // switch for enable/disable auto roll
            className={`switch ${auto ? 'auto' : 'manual'}`}
            onClick={() => setAuto(prev => !prev)}
          >
            <svg className="progress-ring">
              <circle // progress for turning auto roll back on
                className="progress-ring__circle"
                ref={autoDelayProgressDOM}
              />
            </svg>
          </div>
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
