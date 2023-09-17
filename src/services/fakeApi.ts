import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

import { offersData, currencyData } from './fakeData';

const RESPONSE_DELAY = 2500;

export default (): void => {
  const httpMock = new AxiosMockAdapter(axios, { delayResponse: RESPONSE_DELAY });

  httpMock.onGet('/currency').reply(() => {
    return [
      200,
      {
        data: currencyData,
      },
    ];
  });

  httpMock.onPost('/offers').reply(() => {
    return [
      200,
      {
        data: offersData,
        totalPages: 10,
      },
    ];
  });
};
