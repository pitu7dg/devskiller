import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Header from '@components/Header';
import Filters from '@components/Filters';
import Offers from '@components/Offer';
import Spinner from '@components/Spinner';
import { getOffers, getActualCurrency, Offer, Currency } from '@services/index';
import style from './App.scss';
import { Currency as ECurrency } from '@enum';

const onFavoriteChange = (offerKey: string): void => {
  return undefined;
};

export const AppComponent: FC = () => {
  const [_version, setVersion] = useState(0);

  const [_isLoadingCurrencies, setIsLoadingCurrencies] = useState(false);
  const [currencies, setCurrencies] = useState<Currency>();
  const [isLoadingOffers, setIsLoadingOffers] = useState(false);
  const [offersList, setOffersList] = useState<Offer[]>([]);
  const [filteredOffersList, setFilteredOfferstList] = useState<Offer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCurrency, setSearchCurrency] = useState(ECurrency.PLN);

  const fetchOffers = async (
    // only for fetchMore purposees
    shouldAppendResult?: boolean,
  ) => {
    setIsLoadingOffers(true);
    try {
      const { data: response } = await getOffers();

      if (shouldAppendResult) {
        setOffersList((currentOffers) => [...currentOffers, ...response.data]);
      } else {
        setOffersList(response.data);
      }
    } finally {
      setIsLoadingOffers(false);
    }
  };

  const handleUpdateList = () => {
    setVersion((v) => v + 1);
  };

  const fetchCurrencyList = async () => {
    setIsLoadingCurrencies(true);
    try {
      const { data: response } = await getActualCurrency();

      setCurrencies(response.data);
    } finally {
      setIsLoadingCurrencies(false);
    }
  };

  const handleChangeQuery = (query: string) => {
    setSearchQuery(query);
  };

  const handleChangeCurrency = (query: ECurrency) => {
    setSearchCurrency(query);
  };

  const handleFetchMoreData = () => {
    fetchOffers(true);
  };

  const scrollHandler = (event: React.UIEvent<HTMLDivElement>) => {
    const containerHeight = event.currentTarget.clientHeight;
    const scrollHeight = event.currentTarget.scrollHeight;
    const scrollTop = event.currentTarget.scrollTop;

    const fromBottom = scrollHeight - containerHeight - 80;

    if (scrollTop > fromBottom) {
      // definietly need to debounce this
      handleFetchMoreData();
    }
  };

  const updateFilteredList = (query: string, offersList: Offer[]) => {
    const checkQuery = `${query}`.toLowerCase().trim();

    setFilteredOfferstList(
      offersList.filter((offer) => {
        const formattedTitle = offer.title.toLowerCase().trim();
        return formattedTitle.includes(checkQuery);
      }),
    );
  };

  useLayoutEffect(() => {
    fetchCurrencyList();
    fetchOffers();
  }, []);

  useEffect(() => {
    // debounce
    updateFilteredList(searchQuery, offersList);
  }, [offersList.length, searchQuery, currencies]);

  return (
    <div className={style.appContainer} data-testid="App">
      <Header />
      <Filters onChangeQuery={handleChangeQuery} onChangeCurrency={handleChangeCurrency} currency={searchCurrency} />
      <div className={style.offersContainer} data-testid="Offers" onScroll={scrollHandler}>
        {!filteredOffersList.length && <span>No results</span>}
        {Boolean(filteredOffersList.length) &&
          filteredOffersList.map((offer) => (
            <Offers
              key={offer.id + `${Math.random() * 123}`}
              offer={offer}
              currencies={currencies}
              currentCurrency={searchCurrency}
              onUpdateList={handleUpdateList}
            />
          ))}
        {isLoadingOffers && <Spinner />}
      </div>
    </div>
  );
};
