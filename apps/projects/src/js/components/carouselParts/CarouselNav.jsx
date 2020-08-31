import React from 'react';
import PropTypes from 'prop-types';
import { FORWARD, BACKWARD } from '../../shared/_constant';

const CarouselNav = ({ className, rollCarousel, counts, current }) => {
  const dots = [];
  for (let i = 0; i < counts; i++) {
    dots.push(
      <li
        key={i}
        className={`${className}__dot ${
          i === current ? `${className}__dot--current` : ''
        }`}
      />
    );
  }
  return (
    <ul className={className}>
      <li className={`${className}__btn`}>
        <div className="btn prev" onClick={() => rollCarousel(BACKWARD)} />
      </li>
      {dots}
      <li className={`${className}__btn`}>
        <div className="btn next" onClick={() => rollCarousel(FORWARD)} />
      </li>
    </ul>
  );
};

CarouselNav.propTypes = {
  className: PropTypes.string,
  rollCarousel: PropTypes.func,
  counts: PropTypes.number,
  current: PropTypes.number,
};

export default CarouselNav;
