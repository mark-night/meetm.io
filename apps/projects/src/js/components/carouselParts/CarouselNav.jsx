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
   * Restart rollDelay on every roll (auto or manual).
   */
  useEffect(() => {
    rollDelayAccum.current = 0;
    rollDelayProgressDOM.current.style.setProperty('--progress', '0');
  }, [current]);

  /**
   * On every roll or auto change, deactivate requested animation frame, then
   * activate new animation frame request if auto is enabled.
   */
  const rollDelayAFReq = useRef(null);
  const rollDelayAccum = useRef(0);
  useEffect(() => {
    deactivateProgressUpdate({ AFReq: rollDelayAFReq });
    if (auto) {
      activateProgressUpdate({
        el: rollDelayProgressDOM,
        prop: '--progress',
        accum: rollDelayAccum,
        end: rollDelay,
        AFReq: rollDelayAFReq,
        callback: () => rollCarousel(FORWARD),
      });
    }
    // current and rollDelay may change at the same time, i.e. when
    // rolling into a project that has different rollDelay
    // todo: if effect will run twice in this case?
  }, [auto, current, rollDelay, rollCarousel]);

  /**
   * On every auto change or roll (manual or auto), deactivate existing animation
   * frame request and reset progress, then activate new animation frame request
   * if auto is not enabled.
   */
  const autoDelayAFReq = useRef(null);
  const autoDelayAccum = useRef(0);
  useEffect(() => {
    deactivateProgressUpdate({
      AFReq: autoDelayAFReq,
      callback: () => {
        autoDelayAccum.current = 0;
        autoDelayProgressDOM.current.style.setProperty('--ring-progress', '0');
      },
    });
    if (!auto) {
      activateProgressUpdate({
        el: autoDelayProgressDOM,
        prop: '--ring-progress',
        end: AUTOPLAY_DELAY,
        accum: autoDelayAccum,
        AFReq: autoDelayAFReq,
        callback: () => dispatch(toggleCarouselAuto(true)),
      });
    }
  }, [auto, current, dispatch]);

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

const activateProgressUpdate = ({ el, prop, accum, end, AFReq, callback }) => {
  let lastTimestamp = null;
  const step = timestamp => {
    const delta = lastTimestamp ? timestamp - lastTimestamp : 0;
    lastTimestamp = timestamp;
    accum.current += delta;
    let progress = Math.min(1, accum.current / end);
    el.current.style.setProperty(prop, progress.toString());
    if (progress < 1) {
      AFReq.current = window.requestAnimationFrame(step);
    } else {
      if (callback) {
        callback();
      }
    }
  };
  AFReq.current = window.requestAnimationFrame(step);
};

const deactivateProgressUpdate = ({ AFReq, callback }) => {
  if (AFReq.current) {
    window.cancelAnimationFrame(AFReq.current);
  }
  if (callback) {
    callback();
  }
};
