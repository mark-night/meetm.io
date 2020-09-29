import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  Fragment,
} from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {
  POSE_PREV,
  POSE_CURRENT,
  POSE_NEXT,
  FORWARD,
  BACKWARD,
  DUR_NORMAL,
} from '../../shared/_constant';
import { normalizeIndex } from '../../shared/_utility';
import { resizeObserver } from '../../shared/_observers';
import CarouselNav from './CarouselNav';
import ProjCard from './ProjCard';
import './ProjsCarousel.scss';

// declare outside component to keep unchanged through rerender
const poses = [POSE_PREV, POSE_CURRENT, POSE_NEXT];
const showIdx = 1; // index for POSE_CURRENT

const ProjsCarousel = ({ className, projs }) => {
  const projsExtended = useMemo(() => extendProjs(projs, poses), [projs]);

  // steps carousel has rolled
  const [steps, setSteps] = useState(0);

  const roll = useCallback(direction => {
    if (direction === FORWARD) {
      setSteps(prevSteps => prevSteps + 1);
    } else if (direction === BACKWARD) {
      setSteps(prevSteps => prevSteps - 1);
    }
  }, []);

  /**
   * keep observing scene DOM to get and pass its width to prism
   */
  const scene = useRef(null);
  useEffect(() => {
    const sceneDOM = scene.current;
    resizeObserver.observe(sceneDOM);
    return () => resizeObserver.unobserve(sceneDOM);
  }, []);

  return (
    <Fragment>
      <div className={className} ref={scene}>
        <TransitionGroup
          component="div"
          className={`${className}__prism`}
          style={{ '--rotation': 120 * steps }}
        >
          {poses.map((pos, index) => {
            // Each pair of proj.key and pose assign proj to a designated face
            // of the prism, which is then rolled by steps.
            const shiftedProjIdx = index - showIdx + steps;
            const proj =
              projsExtended[normalizeIndex(shiftedProjIdx, projsExtended)];
            const shiftedPosIdx = index + steps;
            const pose = poses[normalizeIndex(shiftedPosIdx, poses)];
            const onShow = index === showIdx;
            return (
              <CSSTransition
                // To address subtle pop when ProjCard appear or disappear
                key={proj.key}
                classNames="transition"
                timeout={DUR_NORMAL}
                appear
              >
                <ProjCard
                  // defining show/ready class on creation is necessary, as
                  // when filtering projs, if a proj card switches poses without
                  // changing onShow status, e.g. from pose-prev to pose-next, the
                  // card won't re-render as nothing changed, thus miss class update
                  className={`${className}__proj ${pose} ${
                    onShow ? 'show' : 'ready'
                  }`}
                  proj={proj}
                  onShow={onShow}
                  rollCarousel={roll}
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
      {/* DO NOT NEST CarouselNav INSIDE 3D SCENE, OTHERWISE WEBKIT BROWSERS WILL RENDER INTERSECTION ON PRISM ROLL */}
      <CarouselNav
        className={`${className}__nav`}
        rollCarousel={roll}
        counts={projs.length}
        current={normalizeIndex(steps, projs)}
        inProp={projs.length > 1}
      />
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
