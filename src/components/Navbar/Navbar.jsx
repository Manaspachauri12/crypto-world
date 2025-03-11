import React, { useContext } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import './Navbar.css';
import CryptOLogo from "../../assets/CryptOLogo.png";
import arrow_icon from '../../assets/arrow_icon.png';
import { CoinContext } from '../../context/CoinContext';

const Navbar = () => {
  const { updateCurrency } = useContext(CoinContext);
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

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

        {/* Conditionally render login or logout based on authentication state */}
        {!isAuthenticated ? (
          <button onClick={async () => {
            try {
              console.log("Sign Up button clicked!");
              await loginWithRedirect();
            } catch (err) {
              console.error("Auth0 Login Error:", err);
            }
          }}>
            Sign Up <img src={arrow_icon} alt="arrow icon" />
          </button>
        ) : (
          <div>
            <span>Welcome, {user.name}</span>
            <button onClick={() => logout({ returnTo: `${window.location.origin}/#/` })}>
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
