import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FORWARD, BACKWARD } from '../../shared/_constant';

const ProjCard = ({ className, proj, onShow, rollCarousel, inLandscape }) => {
  const downCoordinate = useRef([null, null]);
  const handlePointerDown = useCallback(
    e => {
      if (!onShow) return;
      e.preventDefault();
      downCoordinate.current = [e.clientX, e.clientY];
    },
    [onShow]
  );
  const handlePointerUp = useCallback(
    e => {
      if (!onShow) return;
      const tolerance = 10;
      const dX = e.clientX - downCoordinate.current[0];
      const dY = e.clientY - downCoordinate.current[1];
      const swipedInX = Math.abs(dX) >= Math.abs(dY);
      if (
        (!inLandscape && swipedInX && dX < -tolerance) ||
        (inLandscape && !swipedInX && dY < -tolerance)
      ) {
        rollCarousel(FORWARD);
      } else if (
        (!inLandscape && swipedInX && dX > tolerance) ||
        (inLandscape && !swipedInX && dY > tolerance)
      ) {
        rollCarousel(BACKWARD);
      }
    },
    [onShow, inLandscape, rollCarousel]
  );

  return (
    <div
      className={className}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <img src={'http://localhost:8000' + proj.images[0]} alt={proj.title} />
    </div>
  );
};

ProjCard.propTypes = {
  className: PropTypes.string,
  proj: PropTypes.object,
  onShow: PropTypes.bool,
  rollCarousel: PropTypes.func,
  inLandscape: PropTypes.bool,
};

export default ProjCard;
