import React, { FC } from 'react';
import style from './Header.scss';

interface HeaderProps {
  test?: string;
}

export const getFavCount = () => {
  let list: string[];

  try {
    list = JSON.parse(localStorage.getItem('favoffers')) || [];
  } catch {
    list = [];
  }

  return list.length;
};

export const HeaderComponent: FC<HeaderProps> = () => (
  <div className={style.headerContainer} data-testid="Header">
    <h1>Job Offers</h1>
    <div className={style.favoritesContainer}>
      <span>★</span>
      <span className={style.favoritesNumber} data-testid="favoritesNumber">
        {getFavCount()}
      </span>
    </div>
  </div>
);
