import mock from '@services/fakeApi';
import axios, { AxiosResponse } from 'axios';

mock();

export interface Offer {
  id: string;
  title: string;
  description: string;
  category: string;
  salary: number;
  url: string;
}

export interface Currency {
  [type: string]: number;
}

export const getActualCurrency = (): Promise<
  AxiosResponse<{
    totalPages: number;
    data: Currency;
  }>
> => axios.get(`/currency`);

export const getOffers = (): Promise<
  AxiosResponse<{
    data: Offer[];
  }>
> => axios.post('/offers');
