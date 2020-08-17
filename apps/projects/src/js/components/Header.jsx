import React from 'react';
import SelectFilter from './filters/SelectFilter';
import InputFilter from './filters/InputFilter';

export default function Header() {
  return (
    <div className="header">
      <SelectFilter className="header__select" />
      <InputFilter className="header__input" />
    </div>
  );
}
