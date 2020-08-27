import React from 'react';
import PropTypes from 'prop-types';

const ProjCard = ({ className, proj, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <img src={'http://localhost:8000' + proj.images[0]} alt={proj.title} />
    </div>
  );
};

ProjCard.propTypes = {
  className: PropTypes.string,
  proj: PropTypes.object,
  onClick: PropTypes.func,
};

export default ProjCard;
