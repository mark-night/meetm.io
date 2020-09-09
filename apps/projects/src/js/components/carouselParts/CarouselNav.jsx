import React, { useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { FORWARD, BACKWARD, AUTOPLAY_DELAY } from '../../shared/_constant';
import { toggleCarouselAuto } from '../../store/actions/statusActions';
import './CarouselNav.scss';

const CarouselNav = ({ rollCarousel, counts, current }) => {
  const classBase = 'carousel-nav';
  const auto = useSelector(state => state.status.carousel_auto);
  const dispatch = useDispatch();
  const rollDelay = useSelector(state => state.status.carousel_autoroll_delay);
  const rollDelayed = useRef(0); // how long of the scheduled delay has passed
  const rollDelayProgressDOM = useRef(null);
  const autoDelayProgressDOM = useRef(null);
  const rollToUse = useCallback(
    direction => {
      rollCarousel(direction);
      dispatch(toggleCarouselAuto(false));
    },
    [rollCarousel, dispatch]
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
      }, 1000 / 10);
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
      }, 1000 / 10);
      // auto delay schedule
      autoDelayTimer = setTimeout(
        () => dispatch(toggleCarouselAuto(true)),
        AUTOPLAY_DELAY
      );
    }
    return () => {
      if (progressTimer) clearInterval(progressTimer);
      if (autoDelayTimer) clearTimeout(autoDelayTimer);
    };
  }, [auto, current, rollCarousel, dispatch]);

  const dotsJSX = [];
  for (let i = 0; i < counts; i++) {
    dotsJSX.push(
      <li
        key={i}
        className={`${classBase}__dot ${
          i === current ? `${classBase}__dot--current` : ''
        }`}
      />
    );
  }
  return (
    <ul className={`${classBase}`}>
      <div // progress for next auto roll
        className={`${classBase}__progress`}
        ref={rollDelayProgressDOM}
      />
      <li className={`${classBase}__btn`}>
        <div className="btn prev" onClick={() => rollToUse(BACKWARD)} />
      </li>
      {dotsJSX}
      <li className={`${classBase}__btn`}>
        <div className="btn next" onClick={() => rollToUse(FORWARD)} />
      </li>
      <li className={`${classBase}__switch`}>
        <div // switch for enable/disable auto roll
          className={`switch ${auto ? 'auto' : 'manual'}`}
          onClick={() => dispatch(toggleCarouselAuto(!auto))}
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
  );
};

CarouselNav.propTypes = {
  rollCarousel: PropTypes.func,
  counts: PropTypes.number,
  current: PropTypes.number,
};

export default CarouselNav;
