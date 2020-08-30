import React, { useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useSelector } from 'react-redux';
import FilterInput from './filterParts/FilterInput';
import SelectionStack from './filterParts/SelectionStack';
import FilterDropdown from './filterParts/FilterDropdown';
import DropdownToggle from './filterParts/DropdownToggle';
import { DUR_NORMAL } from '../shared/_constant';

const Filter = () => {
  const [dropdownToggled, setDropdownToggled] = useState(false);
  const open = useSelector(state => state.status.filterDropdown_open && true);
  const classBase = 'megaFilter';
  const ref = useRef(null);

  return (
    <div className={`${classBase} wrapper wrapper--medium`} ref={ref}>
      <div className={`${classBase}__top`}>
        <FilterInput
          className={`${classBase}__top__input`}
          triggerDropdown={!dropdownToggled}
        />
        <DropdownToggle
          className={`${classBase}__top__toggle`}
          onToggle={() => setDropdownToggled(true)}
        />
      </div>
      <div className={`${classBase}__center`}>
        <SelectionStack className={`${classBase}__center__selections`} />
      </div>
      <div className={`${classBase}__bottom`}>
        <CSSTransition
          in={open}
          classNames={`${classBase}__bottom__dropdown`}
          timeout={DUR_NORMAL}
          // Add CSSTransition outside the inner component instead of adding it
          // inside the inner component (outmost the JSX it returns) gives the
          // same experience, but:
          // As mount/unmount controlled by CSSTransition works on its children
          // only, it must be placed outside the inner component if some actions
          // need to be taken on the component's mount/unmount (e.g. useEffect()).
          unmountOnExit
        >
          <FilterDropdown
            className={`${classBase}__bottom__dropdown`}
            topNode={ref}
          />
        </CSSTransition>{' '}
      </div>
    </div>
  );
};

export default Filter;
