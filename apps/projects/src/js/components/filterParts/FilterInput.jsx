import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateFilterTerms } from '../../store/actions/filterActions';

const FilterInput = props => {
  const TIME_TO_WAIT_FOR_INPUT = 300;
  const [term, setTerm] = useState('');
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
        placeholder="Filter projects with keywords seperated by comma..."
        value={term}
        onChange={e => setTerm(e.target.value)}
      />
    </div>
  );
};

FilterInput.propTypes = {
  className: PropTypes.string,
};

export default FilterInput;