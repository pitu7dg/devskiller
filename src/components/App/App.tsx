import React, { FC } from 'react';
import Header from '@components/Header';
import Filters from '@components/Filters';
import style from './App.scss';

const onFavoriteChange = (offerKey: string): void => {
  return undefined;
};

export const AppComponent: FC = () => (
  <div className={style.appContainer} data-testid="App">
    <Header />
    <Filters />
    <div className={style.offersContainer} data-testid="Offers">
      {/* TODO: Offer component with rest should be rendered here */}
    </div>
  </div>
);
