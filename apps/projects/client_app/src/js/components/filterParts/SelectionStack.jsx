import React, { useEffect, useCallback, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  updateFilterSelections,
  clearFilterSelections,
} from '../../store/actions/filterActions.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { DUR_FAST } from '../../shared/_constant';
import { resizeObserver } from '../../shared/_observers';
import ClearCross from './ClearCross';
import './SelectionStack.scss';

const SelectionStack = ({ className, dropdownOpened }) => {
  const selections = useSelector(state => state.filter.selections);
  const dispatch = useDispatch();

  // start observing stack size change
  useEffect(() => {
    const stackEl = document.querySelector('.megaFilter__center');
    resizeObserver.observe(stackEl);
    return () => resizeObserver.unobserve(stackEl);
  }, []);

  return (
    <CSSTransition
      in={selections.length > 0}
      classNames="transition"
      timeout={DUR_FAST}
      mountOnEnter
      unmountOnExit
    >
      {/* a wrapper is necessary to make transition easier */}
      <div className="transition-wrapper">
        <div
          className={`${className} ${dropdownOpened ? 'dropdown-opened' : ''}`}
        >
          <SelectionsFlow
            className={className + '__options'}
            selections={selections}
          />
          <ClearCross
            in={selections.length > 0}
            parentClass={className}
            clickCmd={useCallback(() => dispatch(clearFilterSelections()), [
              dispatch,
            ])}
          />
        </div>
      </div>
    </CSSTransition>
  );
};

SelectionStack.propTypes = {
  className: PropTypes.string,
  dropdownOpened: PropTypes.bool,
};

export default SelectionStack;

/**
 * Flow of all selected options
 */
const SelectionsFlow = ({ selections, className }) => {
  const scrollToBottom = useCallback(el => {
    const flowDOM = el.parentElement;
    flowDOM.scrollTop = flowDOM.scrollHeight - flowDOM.offsetHeight;
  }, []);

  return (
    <TransitionGroup className={className} component="ul">
      {selections.map(option => {
        return (
          <CSSTransition
            key={option}
            timeout={DUR_FAST}
            classNames="transition"
            onEntered={scrollToBottom}
          >
            <SingleOption className={`${className}__option`} option={option} />
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

SelectionsFlow.propTypes = {
  selections: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
};

/**
 * Single selected option
 */
const SingleOption = memo(function SingleOption({ className, option }) {
  const dispatch = useDispatch();
  const clearOption = useCallback(
    () => dispatch(updateFilterSelections(option, false)),
    [dispatch, option]
  );
  return (
    <li className={className}>
      <span className="label">{option}</span>
      <ClearCross in={true} parentClass="option" clickCmd={clearOption} />
    </li>
  );
});

SingleOption.propTypes = {
  className: PropTypes.string,
  option: PropTypes.string,
};
