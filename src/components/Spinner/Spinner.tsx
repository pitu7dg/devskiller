import React from 'react';
import style from './Spinner.scss';

export default () => (
  <div className={style.spinnerContainer} data-testid="Spinner">
    <div className={style.spinner} />
  </div>
);
