import React, { createContext, useState, useEffect } from 'react';

export const CoinContext = createContext();

const CoinContextProvider = ({ children }) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({ name: 'usd', symbol: '$' });

  const fetchAllCoin = async () => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`);
      const data = await response.json();
      setAllCoin(data);
    } catch (err) {
      console.error('Error fetching coins:', err);
    }
  };

  useEffect(() => {
    fetchAllCoin();
  }, [currency.name]);

  const updateCurrency = (newCurrency) => {
    const currencyData = {
      usd: { symbol: '$', name: 'usd' },
      inr: { symbol: '₹', name: 'inr' },
      eur: { symbol: '€', name: 'eur' },
      gbp: { symbol: '£', name: 'gbp' },
      jpy: { symbol: '¥', name: 'jpy' },
      aud: { symbol: 'A$', name: 'aud' },
      cad: { symbol: 'C$', name: 'cad' },
    };
    setCurrency(currencyData[newCurrency] || currencyData['usd']);
  };

  return (
    <CoinContext.Provider value={{ allCoin, currency, updateCurrency }}>
      {children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
