import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { updateFilterSelections } from '../../store/actions/filterActions.js';
import { DUR_NORMAL } from '../../shared/_constant';

const FilterDropdown = props => {
  const className = props.className;
  const tags = useSelector(state => state.filter.tags || {});
  const open = useSelector(state => state.filter.open && true);
  const selections = useSelector(state => state.filter.selections || []);

  return (
    <CSSTransition
      in={open}
      classNames={className}
      timeout={DUR_NORMAL}
      unmountOnExit
    >
      <div className="transition-wrapper">
        <ul
          className={`${className} ${
            selections.length > 0 ? 'with-selections' : ''
          }`}
        >
          {Object.keys(tags).map(tagGroup => {
            return (
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
    </CSSTransition>
  );
};

FilterDropdown.propTypes = {
  className: PropTypes.string,
};

export default FilterDropdown;

const FilterOptionGroup = props => {
  const selections = useSelector(state => state.filter.selections || []);
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
