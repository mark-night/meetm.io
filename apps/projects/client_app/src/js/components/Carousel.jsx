import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import ProjsCarousel from './carouselParts/ProjsCarousel';
import { usePrevious } from '../shared/_hook';
import { DUR_FAST } from '../shared/_constant';
import './Carousel.scss';

const Carousel = () => {
  const projects = useSelector(state => state.meta.projects);
  const filtered = useSelector(state => state.chosen.filtered, shallowEqual);
  const prevFiltered = usePrevious(projects, filtered);
  const classBase = 'carousel';

  const classNames = 'transition',
    timeout = DUR_FAST;

  return (
    <div
      className={`${classBase} wrapper`}
      role="region"
      aria-label="Matched projects"
    >
      <CSSTransition
        in={projects.length === 0}
        classNames={`${classNames}__message`}
        timeout={timeout}
        mountOnEnter
        unmountOnExit
      >
        <p className={`${classBase}__message`}>Loading projects data.</p>
      </CSSTransition>
      <CSSTransition
        in={projects.length > 0 && filtered.length === 0}
        classNames={`${classNames}__message`}
        timeout={timeout}
        mountOnEnter
        unmountOnExit
      >
        <p className={`${classBase}__message`}>
          Nothing matched. <br />
          Try loosing filter criteria.
        </p>
      </CSSTransition>
      <CSSTransition
        in={projects.length > 0 && filtered.length > 0}
        classNames={`${classNames}__projs`}
        timeout={timeout}
        mountOnEnter
        unmountOnExit
      >
        <ProjsCarousel
          className={`${classBase}__projs`}
          projs={filtered.length > 0 ? filtered : prevFiltered}
        />
      </CSSTransition>
    </div>
  );
};

export default Carousel;
