import mock from '@services/fakeApi';
import axios, { AxiosResponse } from 'axios';

mock();

interface Offer {
  id: string;
  title: string;
  description: string;
  category: string;
  salary: number;
  url: string;
}

interface Currency {
  [type: string]: number;
}

const getActualCurrency = (): Promise<
  AxiosResponse<{
    totalPages: number;
    data: Currency[];
  }>
> => axios.get(`/currency`);

const getOffers = (): Promise<
  AxiosResponse<{
    data: Offer[];
  }>
> => axios.post('/offers');

export default {
  getActualCurrency,
  getOffers,
};
