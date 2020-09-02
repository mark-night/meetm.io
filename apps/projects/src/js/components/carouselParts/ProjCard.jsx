import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateCarouselAutorollDelay } from '../../store/actions/statusActions';
import { SLIDE_DURATION } from '../../shared/_constant';
import ImageSlide from './ImageSlide';
import './ProjCard.scss';

const ProjCard = ({ className, proj, onShow }) => {
  /**
   * update store state for auto roll delay, which is consumed by carousel nav
   */
  const dispatch = useDispatch();
  useEffect(() => {
    // update only on entering onShow
    if (onShow) {
      dispatch(
        updateCarouselAutorollDelay(proj.images.length * SLIDE_DURATION)
      );
    }
  }, [dispatch, onShow, proj.images]);

  return (
    <div className={className}>
      <ImageSlide images={proj.images} altText={proj.title} onShow={onShow} />
    </div>
  );
};

ProjCard.propTypes = {
  className: PropTypes.string,
  proj: PropTypes.object,
  onShow: PropTypes.bool,
};

export default ProjCard;
