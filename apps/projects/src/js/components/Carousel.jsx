import React from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { DUR_FAST } from '../shared/_constant';
import ProjsCarousel from './carouselParts/ProjsCarousel';

const Carousel = () => {
  const filtered = useSelector(state => state.chosen.filtered);
  const classBase = 'carousel';

  let key,
    classNames = 'transition',
    jsxOutput;
  if (!filtered) {
    key = 'loading';
    classNames += '__message';
    jsxOutput = (
      <p className={`${classBase}__message`}>Loading projects data.</p>
    );
  } else if (filtered.length === 0) {
    key = 'no-match';
    classNames += '__message';
    jsxOutput = (
      <p className={`${classBase}__message`}>
        Nothing matched. <br />
        Try loosing filter criteria.
      </p>
    );
  } else {
    key = 'carousel';
    classNames += '__projs';
    jsxOutput = (
      <ProjsCarousel className={`${classBase}__projs`} projs={filtered} />
    );
  }

  return (
    <div className={`${classBase} wrapper`}>
      <SwitchTransition mode="out-in">
        <CSSTransition key={key} classNames={classNames} timeout={DUR_FAST}>
          {jsxOutput}
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default Carousel;
