import React, { useEffect, Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateCarouselAutorollDelay } from '../../store/actions/statusActions';
import { SLIDE_DURATION } from '../../shared/_constant';
import ImageSlide from './ImageSlide';
import SwipeRoll from './SwipeRoll';
import './ProjCard.scss';

const ProjCard = ({ className, proj, onShow, rollCarousel }) => {
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

  /**
   * Give clue to user indicating data can be scrolled
   */
  const dataDOM = useRef(null);
  // useEffect(() => {
  //   let timer;
  //   if (onShow) {
  //     const dom = dataDOM.current;
  //     if (dom.scrollHeight > dom.clientHeight) {
  //       timer = setInterval(() => {
  //         if (dom.scrollHeight - dom.scrollTop === dom.clientHeight) {
  //           dom.scrollTop = 0;
  //         }
  //         dom.scrollBy(0, 1);
  //       }, 100);
  //     }
  //   } else {
  //     timer && clearInterval(timer);
  //   }
  //   return () => timer && clearInterval(timer);
  // }, [onShow]);

  const linkSymbol = (
    <svg className="link__symbol" viewBox="0 0 100 100">
      <path d="M83.3,83.3H16.7V16.9l16.7-0.2V0H0v100h100V58.3H83.3V83.3z M50,0l16.7,16.7l-25,25l16.7,16.7l25-25L100,50V0H50z" />
    </svg>
  );

  return (
    <div className={className}>
      <ImageSlide images={proj.images} altText={proj.title} onShow={onShow} />
      {onShow ? <SwipeRoll rollCarousel={rollCarousel} /> : null}
      <div className="info-wrapper">
        {/* To deal with stacking context easier */}
        <div className="info">
          <a
            href={proj.proj_url}
            target="_blank"
            rel="noreferrer"
            className="info__title link"
          >
            {proj.title}
            {linkSymbol}
          </a>
          <div className="info__data" ref={dataDOM}>
            <p className="info__data__tech">
              {['languages', 'frameworks', 'tools', 'concepts'].map(tech => {
                return proj[tech].map(tag => {
                  return (
                    <Fragment key={`${tech}-${tag}`}>
                      <span className="info__data__tech__tag">{tag}</span>{' '}
                    </Fragment>
                  );
                });
              })}
            </p>
            {proj.code_url.length === 0 ? null : (
              <a
                href={proj.code_url}
                target="_blank"
                rel="noreferrer"
                className="info__data__link link"
              >
                &lt;&nbsp;Source Code&nbsp;&gt;
                {linkSymbol}
              </a>
            )}
            <p className="info__data__texts">{proj.desc_long}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

ProjCard.propTypes = {
  className: PropTypes.string,
  proj: PropTypes.object,
  onShow: PropTypes.bool,
  rollCarousel: PropTypes.func,
};

export default ProjCard;
