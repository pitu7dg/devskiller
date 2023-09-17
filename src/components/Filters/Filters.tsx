import React, { FC } from 'react';

import { Currency as ECurrency } from '@enum';
import style from './Filters.scss';

interface FiltersProps {
  test?: string;
  currency: ECurrency;
  onChangeQuery: (query: string) => void;
  onChangeCurrency: (currency: ECurrency) => void;
}

const currencyList = Object.values(ECurrency);

export const FiltersComponent: FC<FiltersProps> = ({ onChangeQuery, onChangeCurrency, currency }) => {
  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeQuery(e.target.value);
  };

  const handleChangeCurrency = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as ECurrency;
    onChangeCurrency(value);
  };

  return (
    <div data-testid="Filters">
      <div className={style.filtersWrapper}>
        <div className={style.searchInputContainer}>
          <label>Search:</label>
          <input
            data-testid="searchInput"
            className={style.offersSearchInput}
            placeholder="Search list by titles"
            onChange={handleChangeQuery}
          />
        </div>
        <div className={style.selectBoxWrapper}>
          <label>Currency:</label>
          <select
            data-testid="currencySelect"
            className={style.selectInput}
            onChange={handleChangeCurrency}
            value={currency}
          >
            {currencyList.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
