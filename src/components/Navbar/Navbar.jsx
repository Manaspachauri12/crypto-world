import React, { useContext } from 'react';
import './Navbar.css';
import CryptOLogo from "../../assets/CryptOLogo.png";
import arrow_icon from '../../assets/arrow_icon.png';
import { CoinContext } from '../../context/CoinContext';

const Navbar = () => {
  const { updateCurrency } = useContext(CoinContext);

  const currencyHandler = (event) => {
    const selectedCurrency = event.target.value;
    updateCurrency(selectedCurrency);
  };

  return (
    <div className='navbar'>
      <img src={CryptOLogo} alt="CryptOLogo" className='logo' />
      <ul>
        <li>Home</li>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav-right">
        <select onChange={currencyHandler} aria-label="Select currency">
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
        <button>Sign up <img src={arrow_icon} alt="arrow icon" /></button>
      </div>
    </div>
  );
};

export default Navbar;
