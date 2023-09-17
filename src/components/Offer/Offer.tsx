import React, { FC } from 'react';
import style from './Offer.scss';

interface OfferProps {
  offer: {
    id: string;
    title: string;
    salary: number;
    description: string;
    category: string;
    url: string;
  };
}

export const getOfferColorClassName = (category?: string): string => style.defaultOffer;

export const isAlreadyFavorite = (): boolean => false;

export const OfferComponent: FC<OfferProps> = ({ offer }) => (
  <div className={`${style.offerContainer} ${getOfferColorClassName(offer.category)}`} data-testid="Offer">
    <div className={style.offerHeader}>
      <h3>{offer.title}</h3>
      <span data-testid="salary">0000</span>
    </div>
    <div className={style.offerDescription}>{offer.description}</div>
    <div className={style.offerFooter}>
      <a className={style.offerLink}>Go to offer</a>
      <div className={style.offerFavorite} data-testid="offerFavorite">
        {isAlreadyFavorite() ? (
          <span data-testid="removeFavorite" className={style.favoriteOffer}>
            Remove from favorite
          </span>
        ) : (
          <span data-testid="addFavorite">Add to favorite</span>
        )}
      </div>
      <div className={style.offerCategory}>{offer.category}</div>
    </div>
  </div>
);
