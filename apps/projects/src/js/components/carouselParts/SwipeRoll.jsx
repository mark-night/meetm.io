import React from 'react';
import PropTypes from 'prop-types';
import { Swipeable } from 'react-swipeable';
import { useDispatch } from 'react-redux';
import { toggleCarouselAuto } from '../../store/actions/statusActions';
import { FORWARD, BACKWARD } from '../../shared/_constant';
import './SwipeRoll.scss';

const SwipeRoll = ({ inLandscape, rollCarousel }) => {
  const dispatch = useDispatch();

  const rollBackward = () => {
    rollCarousel(BACKWARD);
    dispatch(toggleCarouselAuto(false));
  };

  const rollForward = () => {
    rollCarousel(FORWARD);
    dispatch(toggleCarouselAuto(false));
  };

  return (
    <Swipeable
      className="swipe-blocker"
      onSwipedLeft={() => !inLandscape && rollForward()}
      onSwipedRight={() => !inLandscape && rollBackward()}
      onSwipedUp={() => inLandscape && rollForward()}
      onSwipedDown={() => inLandscape && rollBackward()}
      delta={10}
      preventDefaultTouchmoveEvent={true}
      trackTouch={true}
      trackMouse={true}
      nodeName="div"
    />
  );
};

SwipeRoll.propTypes = {
  inLandscape: PropTypes.bool,
  rollCarousel: PropTypes.func,
};

export default SwipeRoll;
