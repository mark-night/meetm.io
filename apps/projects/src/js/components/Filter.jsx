import React, { useState, useRef, useCallback, useEffect } from 'react';
import FilterInput from './filterParts/FilterInput';
import SelectionStack from './filterParts/SelectionStack';
import FilterDropdown from './filterParts/FilterDropdown';
import DropdownToggle from './filterParts/DropdownToggle';
import './Filter.scss';

const Filter = () => {
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [dropdownToggleTaught, setDropdownToggleTaught] = useState(false);
  const classBase = 'megaFilter';
  const megaFilter = useRef(null);

  const toggleDropdown = useCallback(() => {
    setDropdownToggleTaught(true);
    setDropdownOpened(state => !state);
  }, []);

  const onInputFocus = useCallback(() => {
    if (!dropdownToggleTaught) {
      setDropdownOpened(true);
    }
  }, [dropdownToggleTaught]);

  useEffect(() => {
    const closeDropdown = e => {
      if (!megaFilter.current.contains(e.target)) {
        // click anywhere outside megaFilter
        setDropdownOpened(false);
      }
    };
    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, []);

  return (
    <form
      role="search"
      className={`${classBase} wrapper wrapper--medium`}
      ref={megaFilter}
    >
      <div className={`${classBase}__top`}>
        <FilterInput
          className={`${classBase}__top__input`}
          onInputFocus={onInputFocus}
        />
        <DropdownToggle
          className={`${classBase}__top__toggle`}
          dropdownOpened={dropdownOpened}
          onClick={toggleDropdown}
        />
      </div>
      <div className={`${classBase}__center`}>
        <SelectionStack
          className={`${classBase}__center__selections`}
          dropdownOpened={dropdownOpened}
        />
      </div>
      <div className={`${classBase}__bottom`}>
        <FilterDropdown
          className={`${classBase}__bottom__dropdown`}
          dropdownOpened={dropdownOpened}
        />
      </div>
    </form>
  );
};

export default Filter;
