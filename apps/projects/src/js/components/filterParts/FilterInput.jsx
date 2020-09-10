import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilterTerms } from '../../store/actions/filterActions';
import { toggleFilterDropdown } from '../../store/actions/statusActions';
import ClearCross from '../ClearCross';
import './FilterInput.scss';

const FilterInput = props => {
  const TIME_TO_WAIT_FOR_INPUT = 300;
  const [term, setTerm] = useState('');
  const selections = useSelector(state => state.filter.selections);
  const open = useSelector(state => state.status.filterDropdown_open);
  const dispatch = useDispatch();

  useEffect(() => {
    // don't update terms for search due to short delay in user input
    const timer = setTimeout(() => {
      dispatch(updateFilterTerms(term));
    }, TIME_TO_WAIT_FOR_INPUT);
    // clean up before next render
    return () => {
      clearTimeout(timer);
    };
  }, [term, dispatch]);

  return (
    <div className={props.className}>
      <input
        type="text"
        placeholder="Filter projects by keywords (seperat with comma)..."
        value={term}
        className={`${props.className}__texts`}
        onChange={e => setTerm(e.target.value)}
        onFocus={() => {
          if (props.triggerDropdown && selections.length === 0 && !open) {
            dispatch(toggleFilterDropdown(true));
          }
        }}
      />
      <ClearCross
        in={term.length > 0}
        parentClass={props.className}
        clickCmd={() => setTerm('')}
      />
    </div>
  );
};

FilterInput.propTypes = {
  className: PropTypes.string,
  triggerDropdown: PropTypes.bool,
};

export default FilterInput;
