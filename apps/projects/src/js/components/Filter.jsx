import React from 'react';
import FilterInput from './filterParts/FilterInput';
import SelectionStack from './filterParts/SelectionStack';
import FilterDropdown from './filterParts/FilterDropdown';
import DropdownToggle from './filterParts/DropdownToggle';

const Filter = () => {
  const classBase = 'megaFilter';

  return (
    <div className={`${classBase} wrapper`}>
      <div className={`${classBase}__top`}>
        <FilterInput className={`${classBase}__top__input`} />
        <DropdownToggle className={`${classBase}__top__toggle`} />
      </div>
      <div className={`${classBase}__center`}>
        <SelectionStack className={`${classBase}__center__selections`} />
      </div>
      <div className={`${classBase}__bottom`}>
        <FilterDropdown className={`${classBase}__bottom__dropdown`} />
      </div>
    </div>
  );
};

export default Filter;
