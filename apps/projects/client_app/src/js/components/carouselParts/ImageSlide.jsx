import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import {
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
    if (onShow && images.length > 1) {
      timer = setInterval(() => {
        setCurrent(prevCurrent => prevCurrent + 1);
      }, SLIDE_DURATION);
    }
    return () => timer && clearInterval(timer);
  }, [onShow, images.length]);

  return (
    <ul className={classBase}>
      {loopSlice(images, current - 1, 3).map((image, index) => (
        <li key={index + current}>
          <picture>
            <source
              media={`(max-aspect-ratio: ${RATIO_NUMERATOR}/${RATIO_DENOMINATOR})`}
              srcSet={imgSrcset(image, 'portrait')}
              sizes="calc(min(1024px, 100vw) - 2rem - 20vw)"
            />
            <source
              srcSet={imgSrcset(image, 'landscape')}
              sizes="calc(min(1024px, 100vw) - 2rem - 10vw)"
            />
            <img
              src={MEDIA_ROOT + image}
              alt={`Screenshot ${
                normalizeIndex(current + index, images) + 1
              } of ${altText}`}
              className={`${classBase}__image ${
                index === 1 ? 'onshow' : 'standby'
              }`}
            />
          </picture>
        </li>
      ))}
    </ul>
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
  const srcset = IMG_WIDTHS[mode].map(
    width =>
      `${file}${
        mode === 'portrait' ? '-portrait' : ''
      }-${width.toString()}.${ext} ${width.toString()}w`
  );
  srcset.push(`${file}${mode === 'portrait' ? '-portrait' : ''}.${ext}`);
  return srcset.join(',');
};
