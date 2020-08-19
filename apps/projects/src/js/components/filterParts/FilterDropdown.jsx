import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { updateFilterSelections } from '../../store/actions/filterActions.js';

const FilterDropdown = props => {
  const { className } = props;
  const selections = useSelector(state => state.filter.selections || []);
  const tags = useSelector(state => state.filter.tags || {});
  const dispatch = useDispatch();

  const handleOptionClick = e => {
    const selection = e.target.getAttribute('proj-tag');
    selections.includes(selection)
      ? dispatch(updateFilterSelections(selection, false))
      : dispatch(updateFilterSelections(selection));
  };

  const optionGroups_jsx = Object.keys(tags).map(optionGroup => {
    const options_jsx = tags[optionGroup].map(option => {
      const selectStatus = selections.includes(option) ? 'selected' : '';
      return (
        <li
          key={option}
          className={`${className}__option ${selectStatus}`}
          onClick={handleOptionClick}
          proj-tag={option}
        >
          {option}
        </li>
      );
    });
    return (
      <li
        key={optionGroup.toLowerCase()}
        className={`${className}__optionGroup`}
      >
        <ul>
          <li className={`${className}__label`}>{optionGroup}</li>
          {options_jsx}
        </ul>
      </li>
    );
  });
  return <ul className={className}>{optionGroups_jsx}</ul>;
};

FilterDropdown.propTypes = {
  className: PropTypes.string,
};

export default FilterDropdown;
