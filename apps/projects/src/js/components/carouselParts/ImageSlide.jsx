import React, { useState, Fragment, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import {
  DUR_SLOW,
  MEDIA_ROOT,
  SLIDE_DURATION,
  RATIO_NUMERATOR,
  RATIO_DENOMINATOR,
  IMG_WIDTHS,
} from '../../shared/_constant';
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
            <picture>
              <source
                media={`(max-aspect-ratio: ${RATIO_NUMERATOR}/${RATIO_DENOMINATOR})`}
                srcSet={imgSrcset(image, 'portrait')}
              />
              <source srcSet={imgSrcset(image, 'landscape')} />
              <img
                sizes={`(max-aspect-ratio: ${RATIO_NUMERATOR}/${RATIO_DENOMINATOR}) calc(min(1024px, 100vw) - 2rem - 20vw), calc(min(1024px, 100vw) - 2rem - 10vw)`}
                // sizes="200px"
                src={MEDIA_ROOT + image}
                alt={`Screenshot ${
                  normalizeIndex(current + index, images) + 1
                } of ${altText}`}
                className={`${classBase}__image ${
                  index === 0 ? 'onshow' : 'standby'
                }`}
              />
            </picture>
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

const imgSrcset = (img, mode) => {
  const originalImg = MEDIA_ROOT + img;
  const { file, ext } = originalImg.match(
    /(?<file>.*)\.(?<ext>jpg|jpeg|png)$/i
  ).groups;
  return IMG_WIDTHS[mode]
    .map(
      width =>
        `${file}${
          mode === 'portrait' ? '-portrait' : ''
        }-${width.toString()}.${ext} ${width.toString()}w`
    )
    .join(',');
};
