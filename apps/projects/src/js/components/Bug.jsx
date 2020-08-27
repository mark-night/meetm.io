import React from 'react';
import PropTypes from 'prop-types';

function Bug(props) {
  return (
    <div className={props.className}>
      <h1>{props.content}</h1>
    </div>
  );
}

Bug.propTypes = {
  content: PropTypes.string,
  className: PropTypes.string,
};

export default Bug;
