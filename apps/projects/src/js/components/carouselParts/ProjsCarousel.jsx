import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useLastNonEmptyArr } from '../../shared/_hook';
import {
  PREV,
  CENTER,
  NEXT,
  OFF_PREV,
  OFF_NEXT,
  FORWARD,
  BACKWARD,
} from '../../shared/_constant';
import { normalizeIndex } from '../../shared/_utility';
import ProjCard from './ProjCard';

const ProjsCarousel = props => {
  const positions = [OFF_PREV, PREV, CENTER, NEXT, OFF_NEXT];
  const posCenter = Math.floor(positions.length / 2);

  const filtered = useSelector(state => state.chosen.filtered);
  const lastNonEmptyFiltered = useLastNonEmptyArr([], filtered);
  // When filter criteria is too high that "filtered" resolves to an empty array,
  // component still needs something to render during parent's exiting transition,
  // otherwise the exiting transition will just be a sudden disappear.
  const nonEmptyProjs = filtered.length > 0 ? filtered : lastNonEmptyFiltered;
  const projs = encodeProjs(nonEmptyProjs, positions);

  // steps carousel has rolled
  const [steps, setSteps] = useState(0);

  const roll = direction => {
    if (direction === FORWARD) {
      setSteps(prevSteps => prevSteps + 1);
    } else if (direction === BACKWARD) {
      setSteps(prevSteps => prevSteps - 1);
    }
  };

  return (
    <Fragment>
      <div className={props.className}>
        {positions.map((position, index) => {
          const shiftedProjIdx = index - posCenter + steps;
          const proj = projs[normalizeIndex(shiftedProjIdx, projs)];
          const projClass = `${props.className}__proj ${positions[index]}`;
          return (
            <ProjCard
              key={proj.key}
              className={proj.key + ' ' + projClass}
              proj={proj}
              onClick={() => {
                if (position === PREV) {
                  roll(BACKWARD);
                } else if (position === NEXT) {
                  roll(FORWARD);
                }
              }}
            />
          );
        })}
      </div>
      <div className="delete-me">
        <button onClick={() => roll(BACKWARD)}>-</button>
        <h4>{normalizeIndex(steps - 1, nonEmptyProjs)}</h4>
        <h3>{steps}</h3>
        <h4>{normalizeIndex(steps + 1, nonEmptyProjs)}</h4>
        <button onClick={() => roll(FORWARD)}>+</button>
        <h4>Total: {nonEmptyProjs.length}</h4>
      </div>
    </Fragment>
  );
};

ProjsCarousel.propTypes = {
  className: PropTypes.string,
};

export default ProjsCarousel;

const encodeProjs = (projs, positions) => {
  /**
   * Return encoded projs with each proj keeps all original data plus a new
   * property "key":
   *  Repeat projs until projs.length >= positions.length,
   *  proj.key = proj.id.toString() + n.toString(), n represents it's the n-th
   *  repeat of projs that proj is from.
   */
  const encodedProjs = [];
  let repeat = 0;
  do {
    for (const proj of projs) {
      // Be careful not to mutate projs!!
      const key = proj.id.toString() + '-' + repeat.toString();
      encodedProjs.push({ ...proj, key });
    }
    repeat++;
  } while (encodedProjs.length < positions.length);
  return encodedProjs;
};
