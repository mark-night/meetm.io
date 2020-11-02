import React, { memo, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import { updateFilterSelections } from '../../store/actions/filterActions';
import { DUR_NORMAL } from '../../shared/_constant';
import './FilterDropdown.scss';

const FilterDropdown = ({ className, dropdownOpened }) => {
  const tags = useSelector(state => state.meta.tags);
  const selections = useSelector(state => state.filter.selections);
  const dropDownWrapper = useRef(null);
  /**
   * Directly modifying class in JSX would override classNames added by
   * CSSTransition, which the slide transitions reply on.
   * It still works if set mountOnEnter/unmountOnExit on CSSTransition, but
   * that means all children have to be re-rendered on every dropDown mount/unmount.
   * So it's better to just hook class manipulations inside useEffect.
   */
  useEffect(() => {
    const el = dropDownWrapper.current;
    if (selections.length > 0) {
      el.classList.add('with-selections');
    }
    return () => el.classList.remove('with-selections');
  }, [selections]);

  return (
    <CSSTransition
      in={dropdownOpened}
      classNames="transition"
      timeout={DUR_NORMAL}
    >
      <div ref={dropDownWrapper} className="transition-wrapper">
        <ul className={className}>
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
    </CSSTransition>
  );
};

FilterDropdown.propTypes = {
  className: PropTypes.string,
  dropdownOpened: PropTypes.bool,
};

export default memo(FilterDropdown);

/**
 * Filter option group
 */
const FilterOptionGroup = memo(function FilterOptionGroup(props) {
  const selections = useSelector(state => state.filter.selections);
  return (
    <ul>
      <li className={`${props.className}__label`}>{props.groupLabel}</li>
      {props.options.map(option => {
        const selected = selections.includes(option);
        return (
          <SingleFilterOption
            key={option}
            className={`${props.className}__option ${
              selected ? 'selected' : ''
            }`}
            option={option}
            selected={selected}
          />
        );
      })}
    </ul>
  );
});

FilterOptionGroup.propTypes = {
  groupLabel: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
};

/**
 * Single option
 */

const SingleFilterOption = memo(function SingleFilterOption({
  className,
  option,
  selected,
}) {
  const dispatch = useDispatch();
  return (
    <li
      key={option}
      className={className}
      onClick={() => dispatch(updateFilterSelections(option, !selected))}
    >
      {option}
    </li>
  );
});

SingleFilterOption.propTypes = {
  className: PropTypes.string,
  option: PropTypes.string,
  selected: PropTypes.bool,
};
