import React, { FC } from 'react';
import style from './Filters.scss';

interface FiltersProps {
  test?: string;
}

export const FiltersComponent: FC<FiltersProps> = () => (
  <div data-testid="Filters">
    <div className={style.filtersWrapper}>
      <div className={style.searchInputContainer}>
        <label>Search:</label>
        <input data-testid="searchInput" className={style.offersSearchInput} />
      </div>
      <div className={style.selectBoxWrapper}>
        <label>Currency:</label>
        <select data-testid="currencySelect" className={style.selectInput}></select>
      </div>
    </div>
  </div>
);
