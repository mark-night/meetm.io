import React, { useState, Fragment, useMemo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {
  POSE_PREV,
  POSE_CURRENT,
  POSE_NEXT,
  RATIO_SWITCH,
  FORWARD,
  BACKWARD,
  DUR_FAST,
} from '../../shared/_constant';
import { normalizeIndex } from '../../shared/_utility';
import CarouselNav from './CarouselNav';
import ProjCard from './ProjCard';
import './ProjsCarousel.scss';

const ProjsCarousel = props => {
  const poses = [POSE_PREV, POSE_CURRENT, POSE_NEXT];
  const showIdx = 1; // index for POSE_CURRENT
  // const projs = extendProjs(props.projs, poses);
  const projs = useMemo(() => extendProjs(props.projs, poses), [
    props.projs,
    poses,
  ]);

  // steps carousel has rolled
  const [steps, setSteps] = useState(0);

  const roll = direction => {
    if (direction === FORWARD) {
      setSteps(prevSteps => prevSteps + 1);
    } else if (direction === BACKWARD) {
      setSteps(prevSteps => prevSteps - 1);
    }
  };

  const prismScene = useRef(null);
  const [ratio, setRatio] = useState(window.innerWidth / window.innerHeight);
  useEffect(() => {
    const syncCarouselPrismRatio = () =>
      setRatio(window.innerWidth / window.innerHeight);
    window.addEventListener('resize', syncCarouselPrismRatio);
    return () => window.removeEventListener('resize', syncCarouselPrismRatio);
  }, []);

  const inLandscape = ratio >= RATIO_SWITCH;

  return (
    <Fragment>
      <div
        className={props.className}
        ref={prismScene}
        style={{
          /* stylelint-disable */
          '--prism-ratio': inLandscape
            ? Math.min(Math.max(3 / 2, ratio), 2.35 / 1)
            : Math.max(375 / 812, ratio),
          '--prism-width': `${
            prismScene.current && prismScene.current.clientWidth
          }px`,
          /* stylelint-enable */
        }}
      >
        <TransitionGroup
          component="div"
          className={`${props.className}__prism`}
          style={{
            /* stylelint-disable */
            transform: `translateZ(calc(-1 * var(--prism-depth))) rotate${
              inLandscape ? 'X' : 'Y'
              // Style driven transition
            }(${steps * (inLandscape ? 120 : -120)}deg)`,
            /* stylelint-enable */
          }}
        >
          {poses.map((pos, index) => {
            // Each pair of proj.key and pose assign proj to a designated face
            // of the prism, which is then rolled by steps.
            const shiftedProjIdx = index - showIdx + steps;
            const proj = projs[normalizeIndex(shiftedProjIdx, projs)];
            const shiftedPosIdx = index + steps;
            const pose = poses[normalizeIndex(shiftedPosIdx, poses)];
            return (
              <CSSTransition
                // To address subtle pop when ProjCard appear or disappear
                key={proj.key}
                classNames="transition"
                timeout={DUR_FAST}
              >
                <ProjCard
                  className={`${props.className}__proj ${pose} ${
                    index === showIdx ? 'show' : 'ready'
                  }`}
                  proj={proj}
                  onShow={index === showIdx}
                  rollCarousel={roll}
                  inLandscape={inLandscape}
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
        <CarouselNav
          className={`${props.className}__nav`}
          rollCarousel={roll}
          counts={props.projs.length}
          current={normalizeIndex(steps, props.projs)}
        />
      </div>
    </Fragment>
  );
};

ProjsCarousel.propTypes = {
  className: PropTypes.string,
  projs: PropTypes.arrayOf(PropTypes.object),
};

export default ProjsCarousel;

const extendProjs = (projs, poses) => {
  /**
   * To pair proj.id (for key) and pose (for element CSS class), and to keep
   * key being unique and same across renders for the same element, an easier way
   * is to extend projs (by repeatedly appending itself to its end) until extended
   * projs is longer than poses, and assign desired key for each proj in the
   * extended projs.
   *
   * Return extended projs with each proj keeps all original data plus a new
   * property "key":
   *  Repeat projs until projs.length >= poses.length,
   *  proj.key = proj.id.toString() + n.toString(), n represents it's the n-th
   *  repeat of projs that proj belongs to.
   *
   * ! Due to the weird React reconciliation result under certain scenario
   * ! (https://github.com/facebook/react/issues/19695),
   * ! if extended projs happens to have the same length as poses does,
   * ! extend it with an extra repeat, just to make sure extended projs is
   * ! always longer than poses.
   */
  if (projs.length === 0) {
    throw new Error('Empty array can not be extended.');
  }
  const extendedProjs = [];
  let repeat = 0;
  do {
    for (const proj of projs) {
      // Be careful not to mutate projs!!
      const key = proj.id.toString() + '-' + repeat.toString();
      extendedProjs.push({ ...proj, key });
    }
    repeat++;
    // ! It's necessary to repeat once more when lengths are equal! See above.
  } while (extendedProjs.length <= poses.length);
  return extendedProjs;
};
