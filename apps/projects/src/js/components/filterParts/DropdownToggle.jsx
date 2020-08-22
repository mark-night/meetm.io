import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { openFilterDropdown } from '../../store/actions/filterActions.js';
import { FILTER_DROPDOWN_TOGGLED } from '../../shared/_constant';

const DropdownToggle = props => {
  const open = useSelector(state => state.filter.open);
  const dispatch = useDispatch();
  return (
    <div
      className={`${props.className} ${open ? 'opened' : 'closed'}`}
      onClick={() => {
        dispatch(openFilterDropdown(!open));
        dispatch({ type: FILTER_DROPDOWN_TOGGLED });
      }}
    ></div>
  );
};

DropdownToggle.propTypes = {
  className: PropTypes.string,
};

export default DropdownToggle;
