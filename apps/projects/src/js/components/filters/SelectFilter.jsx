import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilterSelections } from '../../store/actions/filterActions';
import { NONE } from '../../shared/_constant';

function SelectFilter(props) {
  const categories = useSelector(state => state.filter.categories);
  const dispatch = useDispatch();

  const handleSelectChange = e => {
    dispatch(updateFilterSelections([e.target.value]));
  };

  const options = categories
    ? categories.map(category => {
        return (
          <option value={category} key={category}>
            {category}
          </option>
        );
      })
    : null;

  return (
    <select
      className={props.className}
      onChange={handleSelectChange}
      defaultValue={NONE}
    >
      <option value={NONE}>Category</option>
      {options}
    </select>
  );
}

SelectFilter.propTypes = {
  className: PropTypes.string,
};

export default SelectFilter;
