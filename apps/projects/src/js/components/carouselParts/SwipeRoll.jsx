import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Swipeable } from 'react-swipeable';
import { useDispatch } from 'react-redux';
import { toggleCarouselAuto } from '../../store/actions/statusActions';
import { FORWARD, BACKWARD, RATIO_SWITCH } from '../../shared/_constant';
import './SwipeRoll.scss';

const SwipeRoll = ({ rollCarousel }) => {
  const dispatch = useDispatch();

  const rollBackward = () => {
    rollCarousel(BACKWARD);
    dispatch(toggleCarouselAuto(false));
  };

  const rollForward = () => {
    rollCarousel(FORWARD);
    dispatch(toggleCarouselAuto(false));
  };

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

  return (
    <Swipeable
      className="swipe-blocker"
      onSwipedLeft={() => !inLandscape.current && rollForward()}
      onSwipedRight={() => !inLandscape.current && rollBackward()}
      onSwipedUp={() => inLandscape.current && rollForward()}
      onSwipedDown={() => inLandscape.current && rollBackward()}
      delta={10}
      preventDefaultTouchmoveEvent={true}
      trackTouch={true}
      trackMouse={true}
      nodeName="div"
    />
  );
};

SwipeRoll.propTypes = {
  rollCarousel: PropTypes.func,
};

export default SwipeRoll;
