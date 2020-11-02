import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { DUR_FAST } from '../../shared/_constant';
import { fade } from '../../shared/_transitionStyle';

const ClearCross = props => {
  return (
    <Transition
      in={props.in}
      apear
      timeout={DUR_FAST}
      onExited={props.onExited}
      unmountOnExit
    >
      {phase => (
        <div
          style={{
            ...fade(phase, {
              duration: DUR_FAST,
            }),
          }}
          className={`${props.parentClass}__clear clear-cross`}
          onClick={props.clickCmd}
        />
      )}
    </Transition>
  );
};

ClearCross.propTypes = {
  parentClass: PropTypes.string,
  in: PropTypes.bool,
  clickCmd: PropTypes.func,
  onExited: PropTypes.func,
};

export default memo(ClearCross);
