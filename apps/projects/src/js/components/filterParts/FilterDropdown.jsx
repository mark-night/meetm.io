import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { updateFilterSelections } from '../../store/actions/filterActions';
import { toggleFilterDropdown } from '../../store/actions/statusActions';
import './FilterDropdown.scss';

const FilterDropdown = props => {
  const className = props.className;
  const tags = useSelector(state => state.meta.tags);
  const open = useSelector(state => state.status.filterDropdown_open && true);
  const selections = useSelector(state => state.filter.selections);
  const dispatch = useDispatch();

  useEffect(() => {
    // clicking outside the megaFilter closes it if it is open
    const closeDropdown = e =>
      !props.topNode.current.contains(e.target) &&
      dispatch(toggleFilterDropdown(open && false));
    document.addEventListener('click', closeDropdown);

    return () => document.removeEventListener('click', closeDropdown);
  }, [dispatch, open, props.topNode]);

  return (
    <div
      className={`transition-wrapper ${
        selections.length > 0 ? 'with-selections' : ''
      }`}
    >
      <ul className={`${className}`}>
        {Object.keys(tags).map(tagGroup => {
          return tagGroup === 'Category' ? null : (
            <li key={tagGroup} className={`${className}__optionGroup`}>
              <FilterOptionGroup
                className={className}
                options={tags[tagGroup]}
                groupLabel={tagGroup}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

FilterDropdown.propTypes = {
  className: PropTypes.string,
  topNode: PropTypes.object,
};

export default FilterDropdown;

const FilterOptionGroup = props => {
  const selections = useSelector(state => state.filter.selections);
  const dispatch = useDispatch();
  return (
    <ul>
      <li className={`${props.className}__label`}>{props.groupLabel}</li>
      {props.options.map(option => {
        const selected = selections.includes(option);
        return (
          <li
            key={option}
            className={`${props.className}__option ${
              selected ? 'selected' : ''
            }`}
            onClick={() => dispatch(updateFilterSelections(option, !selected))}
          >
            {option}
          </li>
        );
      })}
    </ul>
  );
};

FilterOptionGroup.propTypes = {
  groupLabel: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
};
