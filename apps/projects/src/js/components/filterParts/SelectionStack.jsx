import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { updateFilterSelections } from '../../store/actions/filterActions.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { DUR_FAST } from '../../shared/_constant';
import { resizeObserver } from '../../shared/_observers';
import ClearCross from '../ClearCross';
import './SelectionStack.scss';

const SelectionStack = props => {
  const selections = useSelector(state => state.filter.selections);
  const dropdownOpened = useSelector(state => state.status.filterDropdown_open);
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
          className={`${props.className} ${
            dropdownOpened ? 'dropdown-opened' : ''
          }`}
        >
          <SelectionsFlow
            className={props.className + '__options'}
            selections={selections}
          />
          <ClearCross
            in={selections.length > 0}
            parentClass={props.className}
            clickCmd={() => dispatch(updateFilterSelections(selections, false))}
          />
        </div>
      </div>
    </CSSTransition>
  );
};

SelectionStack.propTypes = {
  className: PropTypes.string,
};

export default SelectionStack;

const SelectionsFlow = ({ selections, className }) => {
  const dispatch = useDispatch();

  return (
    <TransitionGroup className={className} component="ul">
      {selections.map(option => {
        return (
          <CSSTransition
            key={option}
            classNames={`${className}__option`}
            timeout={DUR_FAST}
            onEntered={el => {
              const flowDOM = el.parentElement;
              flowDOM.scrollTop = flowDOM.scrollHeight - flowDOM.offsetHeight;
            }}
          >
            <li className={`${className}__option`}>
              <span className="label">{option}</span>
              <span
                className="close"
                onClick={() => {
                  dispatch(updateFilterSelections(option, false));
                }}
              ></span>
            </li>
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
