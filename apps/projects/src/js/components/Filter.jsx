import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import FilterInput from './filterParts/FilterInput';
import SelectionStack from './filterParts/SelectionStack';
import FilterDropdown from './filterParts/FilterDropdown';

const Filter = props => {
  const classBase = 'megaFilter';

  return (
    <div className="wrapper">
      <div className={classBase}>
        <div className={`${classBase}__upper`}>
          <FilterInput className={`${classBase}__upper__input`} />
          <SelectionStack className={`${classBase}__upper__selection`} />
        </div>
        <FilterDropdown className={`${classBase}__dropdown`} />
      </div>
    </div>
  );
};

Filter.propTypes = {
  className: PropTypes.string,
};

export default Filter;
