import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { updateFilterSelections } from '../../store/actions/filterActions.js';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { DUR_FAST, DUR_NORMAL } from '../../shared/_constant';
import ClearCross from '../ClearCross';

const SelectionStack = props => {
  const selections = useSelector(state => state.filter.selections || []);
  const dropdownOpened = useSelector(state => state.filter.open);
  const dispatch = useDispatch();
  const [stack, setStack] = useState(false);

  return (
    <CSSTransition
      in={selections.length > 0}
      classNames={props.className}
      timeout={DUR_NORMAL}
      mountOnEnter
      unmountOnExit
      onEntered={() => setStack(true)}
      onExit={() => setStack(false)}
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
            renderFlow={stack}
            selections={selections}
          />
          <ClearCross
            in={stack}
            parentClass={props.className}
            clickCmd={() => {
              setStack(false);
            }}
            onExited={() => dispatch(updateFilterSelections(selections, false))}
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

const SelectionsFlow = props => {
  const dispatch = useDispatch();
  const { renderFlow, selections } = props;
  return (
    <TransitionGroup className={props.className} component="ul">
      {renderFlow
        ? selections.map(option => {
            return (
              <CSSTransition
                key={option}
                classNames={`${props.className}__option`}
                timeout={DUR_FAST}
              >
                <li className={`${props.className}__option`}>
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
          })
        : null}
    </TransitionGroup>
  );
};

SelectionsFlow.propTypes = {
  renderFlow: PropTypes.bool,
  selections: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
};
