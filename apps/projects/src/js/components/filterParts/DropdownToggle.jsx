import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './DropdownToggle.scss';

const DropdownToggle = ({ className, onClick, dropdownOpened }) => {
  return (
    <div
      className={`${className} ${dropdownOpened ? 'opened' : 'closed'}`}
      onClick={onClick}
    ></div>
  );
};

DropdownToggle.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  dropdownOpened: PropTypes.bool,
};

export default memo(DropdownToggle);
