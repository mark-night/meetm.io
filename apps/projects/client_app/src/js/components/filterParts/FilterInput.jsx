import React, { useState, useEffect, memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateFilterTerms } from '../../store/actions/filterActions';
import ClearCross from './ClearCross';
import './FilterInput.scss';

const FilterInput = ({ className, onInputFocus }) => {
  const [term, setTerm] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    // don't update terms for search due to short delay in user input
    const timer = setTimeout(() => {
      dispatch(updateFilterTerms(term));
    }, 300);
    // clean up before next render
    return () => {
      clearTimeout(timer);
    };
  }, [term, dispatch]);

  return (
    <div className={className}>
      <input
        type="text"
        placeholder="Filter projects by keywords (seperat with comma)..."
        value={term}
        className={`${className}__texts`}
        onChange={e => setTerm(e.target.value)}
        onFocus={onInputFocus}
      />
      <ClearCross
        in={term.length > 0}
        parentClass={className}
        // without useCallback, clickCmd (reference) passed down changes on
        // every rerender, thus fail memoization of ClearCross
        clickCmd={useCallback(() => setTerm(''), [])}
      />
    </div>
  );
};

FilterInput.propTypes = {
  className: PropTypes.string,
  onInputFocus: PropTypes.func,
};

export default memo(FilterInput);
