import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFilterDropdown } from '../../store/actions/statusActions';
import './DropdownToggle.scss';

const DropdownToggle = props => {
  const open = useSelector(state => state.status.filterDropdown_open);
  const dispatch = useDispatch();
  return (
    <div
      className={`${props.className} ${open ? 'opened' : 'closed'}`}
      onClick={() => {
        dispatch(toggleFilterDropdown(!open));
        props.onToggle();
      }}
    ></div>
  );
};

DropdownToggle.propTypes = {
  className: PropTypes.string,
  onToggle: PropTypes.func,
};

export default DropdownToggle;
