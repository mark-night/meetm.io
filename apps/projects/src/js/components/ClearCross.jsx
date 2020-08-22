import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { DUR_FAST, CLASS_FADE } from '../shared/_constant';

const ClearCross = props => {
  return (
    <CSSTransition
      in={props.in}
      classNames={`${CLASS_FADE}-${DUR_FAST}`}
      timeout={DUR_FAST}
      mountOnEnter
      unmountOnExit
      onExited={props.onExited}
    >
      <div
        className={`${props.parentClass}__clear`}
        onClick={props.clickCmd}
      ></div>
    </CSSTransition>
  );
};

ClearCross.propTypes = {
  parentClass: PropTypes.string,
  in: PropTypes.bool,
  clickCmd: PropTypes.func,
  onExited: PropTypes.func,
};

export default ClearCross;
