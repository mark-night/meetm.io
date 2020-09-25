import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSwipeable } from 'react-swipeable';
import './SwipeableScroll.scss';

const SwipeableScroll = ({ children, wrapperClass, scrollClass }) => {
  const wrapperDOM = useRef(null);
  const scrollDOM = useRef(null);

  /**
   * disable doc scroll when scrolling on info__data
   * event.preventDefault() won't work on Chrome:
   * https://github.com/facebook/react/issues/14856
   */
  useEffect(() => {
    const stopDocScroll = e => {
      if (
        scrollDOM.current.contains(e.target) &&
        scrollDOM.current.scrollHeight > scrollDOM.current.clientHeight
      ) {
        // only when scrolling scrollContent and scrollContent meant to be scrollable
        e.preventDefault();
      }
    };
    document.body.addEventListener('wheel', stopDocScroll, { passive: false });
    return () => document.body.removeEventListener('wheel', stopDocScroll);
  }, []);

  useEffect(() => {
    const wrapper = wrapperDOM.current;
    // updateScrollbar(wrapperDOM.current, scrollDOM.current);
    wrapperSizeWatcher.observe(wrapper);
    return () => wrapperSizeWatcher.unobserve(wrapper);
  }, []);

  /**
   * scroll by delta of deltaY
   */
  let lastDeltaY = null;
  let lastScroll = 0;
  let nextScrollRAF = null;
  let fillTop = 0;
  let fillBottom = 0;
  const swipeHandler = useSwipeable({
    onSwiping: ({ deltaY, dir }) => {
      const el = scrollDOM.current;
      if (el.scrollHeight > el.clientHeight) {
        if (nextScrollRAF) {
          // stop existing decayed auto scroll
          window.cancelAnimationFrame(nextScrollRAF);
        }
        // fill top/bottom dynamically
        const maxFill = 100;
        if (dir === 'Down' && el.scrollTop + deltaY < 0) {
          fillBottom = 0;
          fillTop = Math.abs(el.scrollTop + deltaY);
          fillTop = curve(fillTop, el.clientHeight / 10) * maxFill;
        } else if (
          dir === 'Up' &&
          el.scrollTop + el.clientHeight + deltaY > el.scrollHeight
        ) {
          fillTop = 0;
          fillBottom =
            el.scrollTop + el.clientHeight + deltaY - el.scrollHeight;
          fillBottom = curve(fillBottom, el.clientHeight / 10) * maxFill;
        }
        el.style.setProperty('--top-height', `${fillTop}px`);
        el.style.setProperty('--bottom-height', `${fillBottom}px`);
        // scroll
        lastScroll = lastDeltaY ? deltaY - lastDeltaY : 0;
        el.scrollBy(0, lastScroll);
        lastDeltaY = deltaY;
      }
    },
    onSwiped: ({ velocity }) => {
      const el = scrollDOM.current;
      if (el.scrollHeight > el.clientHeight) {
        lastDeltaY = null; // reset for next swipe
        // auto decayed scroll
        let decayRate = 0.998;
        const decayFactor = Math.abs(lastScroll) * velocity;
        const scroll = () => {
          lastScroll *= decayRate;
          scrollDOM.current.scrollBy(0, lastScroll);
          decayRate *= curve(decayFactor, 0.1);
          if (Math.abs(lastScroll) > 0.6) {
            // 0.6 is about stopped visually
            nextScrollRAF = window.requestAnimationFrame(scroll);
          }
        };
        nextScrollRAF = window.requestAnimationFrame(scroll);
        // auto shrink top/bottom fill
        const shrinkRate = 0.9;
        const shrink = () => {
          fillTop *= shrinkRate;
          fillBottom *= shrinkRate;
          el.style.setProperty('--top-height', `${fillTop}px`);
          el.style.setProperty('--bottom-height', `${fillBottom}px`);
          if (fillTop + fillBottom > 1) {
            window.requestAnimationFrame(shrink);
          } else {
            window.requestAnimationFrame(() => {
              el.style.setProperty('--top-height', '0');
              el.style.setProperty('--bottom-height', '0');
            });
          }
        };
        window.requestAnimationFrame(shrink);
      }
    },
    delta: 5,
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: true,
  });

  return (
    <div className={`${wrapperClass} swipeable-scroll`} ref={wrapperDOM}>
      <div
        className={`${scrollClass} swipeable-scroll__content`}
        // https://github.com/FormidableLabs/react-swipeable/issues/189
        // https://github.com/FormidableLabs/react-swipeable/issues/77
        {...swipeHandler}
        ref={el => {
          swipeHandler.ref(el);
          scrollDOM.current = el;
        }}
        onWheel={e => {
          // e.preventDefault();
          scrollDOM.current.scrollBy(0, e.deltaY);
        }}
        onScroll={() => {
          updateScrollbar(wrapperDOM.current, scrollDOM.current);
          updateScrollFrameShadow(wrapperDOM.current, scrollDOM.current);
        }}
      >
        {children}
      </div>
      <div className="swipeable-scroll__scrollbar bg" />
      <div className="swipeable-scroll__scrollbar fg" />
    </div>
  );
};

SwipeableScroll.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  wrapperClass: PropTypes.string,
  scrollClass: PropTypes.string,
};

export default SwipeableScroll;

/**
 * update customized scrollbar
 */
const updateScrollbar = (wrapper, scroll) => {
  const bg = wrapper.querySelector('.swipeable-scroll__scrollbar.bg');
  const fg = wrapper.querySelector('.swipeable-scroll__scrollbar.fg');
  if (scroll.scrollHeight <= scroll.clientHeight) {
    bg.style.display = 'none';
    fg.style.display = 'none';
  } else {
    bg.style.display = 'block';
    fg.style.display = 'block';
    const top =
      (scroll.scrollTop / (scroll.scrollHeight - scroll.clientHeight)) *
      (1 - scroll.clientHeight / scroll.scrollHeight) *
      scroll.clientHeight;
    const height = (scroll.clientHeight / scroll.scrollHeight) * 100;
    fg.style.top = `${top}px`;
    fg.style.height = `${height}%`;
  }
};

/**
 * update scroll frame shadow
 */
const updateScrollFrameShadow = (wrapper, scroll) => {
  const opacity = Math.min(5, Math.max(0, scroll.scrollTop)) / 5;
  wrapper.style.setProperty('--opacity', opacity);
};

/**
 * update scrollbar and scroll frame shadow on wrapper size change
 */
const wrapperSizeWatcher = new ResizeObserver(entries => {
  for (const entry of entries) {
    const wrapper = entry.target;
    const scroll = wrapper.querySelector('.swipeable-scroll__content');
    updateScrollbar(wrapper, scroll);
    updateScrollFrameShadow(wrapper, scroll);
  }
});

const curve = (target, factor) => {
  return target / (target + factor);
};
