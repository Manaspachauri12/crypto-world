import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom';  // Import Link from React Router

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  // Handle the search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter coins based on the search query
  const filteredCoins = displayCoin.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className='home'>
      <div className="hero">
        <h1>Largest <br /> Crypto Marketplace</h1>
        <p>Welcome to the world's largest cryptocurrency Marketplace. Sign up to explore more about cryptos.</p>
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search Crypto"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H change</p>
          <p className='market-cap'>Market Cap</p>  
        </div>
        
        {/* Display the filtered coins */}
        {filteredCoins.slice(0, 10).map((item, index) => (
          <div className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt={item.name} />
              {/* Use Link to navigate to Coin detail page */}
              <Link to={`/coin/${item.id}`}>
                <p>{item.name} - {item.symbol}</p>
              </Link>
            </div>
            <p>{currency.symbol}{item.current_price.toLocaleString()}</p>
            <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p className='market-cap'>{currency.symbol}{item.market_cap.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
