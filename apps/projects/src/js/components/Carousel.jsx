import React from 'react';
import { useSelector } from 'react-redux';

const Carousel = () => {
  const filtered = useSelector(state => state.project.filtered);
  const renderFilteredProjs = () => {
    if (!filtered) {
      return <div>Loading projects info from server.</div>;
    } else if (filtered.length === 0) {
      return <div>Nothing matched. Try to loose filtering criteria.</div>;
    } else {
      return filtered.map(proj => {
        return <li key={proj.id}>{proj.title}</li>;
      });
    }
  };
  return <ul>{renderFilteredProjs()}</ul>;
};

export default Carousel;
