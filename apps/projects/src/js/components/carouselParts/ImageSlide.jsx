import React, { useState, Fragment, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { DUR_SLOW, MEDIA_ROOT, SLIDE_DURATION } from '../../shared/_constant';
import { normalizeIndex, loopSlice } from '../../shared/_utility';
import './ImageSlide.scss';

const ImageSlide = ({ images, altText, onShow }) => {
  // Will be a class driven transition, can't simple reuse the mechanism used in
  // ProjsCarousel, which was a style driven transition. The subtle difference
  // is whether
  const classBase = 'slide';
  const [current, setCurrent] = useState(0);

  /**
   * Increase 'current' to slide image, only if in 'onShow' pose and there are
   * more than ONE images.
   */
  useEffect(() => {
    let timer = null;
    if (onShow) {
      timer = setInterval(() => {
        setCurrent(prevCurrent =>
          // no slide for single image
          images.length > 1 ? prevCurrent + 1 : prevCurrent
        );
      }, SLIDE_DURATION);
    }
    return () => timer && clearInterval(timer);
  }, [onShow, images]);

  return (
    <Fragment>
      <TransitionGroup component="li" className={classBase}>
        {loopSlice(images, current, 2).map((image, index) => (
          <CSSTransition
            key={index + current}
            classNames="transition"
            timeout={DUR_SLOW}
          >
            <img
              src={MEDIA_ROOT + image}
              alt={`Screenshot ${
                normalizeIndex(current + index, images) + 1
              } of ${altText}`}
              className={`${classBase}__image ${
                index === 0 ? 'onshow' : 'standby'
              }`}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Fragment>
  );
};

ImageSlide.propTypes = {
  altText: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.string),
  onShow: PropTypes.bool,
};

export default ImageSlide;
