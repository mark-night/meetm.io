import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { updateFilterSelections } from '../../store/actions/filterActions.js';

const SelectionStack = props => {
  const { className } = props;
  const selections = useSelector(state => state.filter.selections || []);
  const dispatch = useDispatch();

  const handleTagClick = e => {
    const selection = e.target.getAttribute('proj-tag');
    dispatch(updateFilterSelections(selection, false));
  };
  const selections_jsx = selections.map(selection => {
    return (
      <li key={selection} className={`${className}__option`}>
        <div className="label">{selection}</div>
        <div
          className="close"
          proj-tag={selection}
          onClick={handleTagClick}
        ></div>
      </li>
    );
  });

  return <ul className={className}>{selections_jsx}</ul>;
};

SelectionStack.propTypes = {
  className: PropTypes.string,
};

export default SelectionStack;
