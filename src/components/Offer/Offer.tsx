import React, { FC } from 'react';
import style from './Offer.scss';
import { Currency } from '@services/index';
import { Currency as ECurrency } from '@enum';

interface OfferProps {
  onUpdateList: () => void;
  currentCurrency: ECurrency;
  currencies: Currency;
  offer: {
    id: string;
    title: string;
    salary: number;
    description: string;
    category: string;
    url: string;
  };
}

export const getOfferColorClassName = (category?: string): string => {
  const lowecasedCategory = `${category}`.toLowerCase();

  switch (lowecasedCategory) {
    case 'backend':
      return style.backendOffer;
    case 'frontend':
      return style.frontendOffer;
    case 'qa':
      return style.testingOffer;
    case 'fullstack':
      return style.fullStackOffer;
    default:
      return style.defaultOffer;
  }
};

export const isAlreadyFavorite = (offerId: string): boolean => {
  try {
    const favList = JSON.parse(localStorage.getItem('favoffers'));

    return favList.includes(offerId);
  } catch {
    return false;
  }
};

export const toggleFavorite = (offerId: string) => {
  let list: string[];

  try {
    list = JSON.parse(localStorage.getItem('favoffers')) || [];
  } catch {
    list = [];
  } finally {
    if (isAlreadyFavorite(offerId)) {
      list = list.filter((id) => id !== offerId);
    } else {
      list.push(offerId);
    }
  }

  const updatedOffers = JSON.stringify(list);
  localStorage.setItem('favoffers', updatedOffers);
};

export const OfferComponent: FC<OfferProps> = ({ offer, currencies, currentCurrency, onUpdateList }) => {
  const getFormatedCurrency = () => {
    const multiplier = currencies[currentCurrency];

    return (multiplier * offer.salary).toFixed(0) + currentCurrency;
  };

  const onClickFavourite = () => {
    toggleFavorite(offer.id);
    onUpdateList();
  };

  return (
    <div className={`${style.offerContainer} ${getOfferColorClassName(offer.category)}`} data-testid="Offer">
      <div className={style.offerHeader}>
        <h3>{offer.title}</h3>
        <span data-testid="salary">{getFormatedCurrency()}</span>
      </div>
      <div className={style.offerDescription}>{offer.description}</div>
      <div className={style.offerFooter}>
        <a className={style.offerLink} href={offer.url} rel="noopener noreferrer" target="_blank">
          Go to offer
        </a>
        <button className={style.offerFavorite} data-testid="offerFavorite" onClick={onClickFavourite}>
          {isAlreadyFavorite(offer.id) ? (
            <span data-testid="removeFavorite" className={style.favoriteOffer}>
              Remove from favorite
            </span>
          ) : (
            <span data-testid="addFavorite">Add to favorite</span>
          )}
        </button>
        <div className={style.offerCategory}>{offer.category}</div>
      </div>
    </div>
  );
};
