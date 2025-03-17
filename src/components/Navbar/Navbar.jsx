import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import CryptOLogo from "../../assets/CryptOLogo.png";
import arrow_icon from '../../assets/arrow_icon.png';
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom';
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const { updateCurrency } = useContext(CoinContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const currencyHandler = (event) => {
    const selectedCurrency = event.target.value;
    updateCurrency(selectedCurrency);
  };

  return (
    <div className='navbar'>
      <img src={CryptOLogo} alt="CryptOLogo" className='logo' />
      <ul>
        <li><Link to="/">Home</Link></li>
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
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">
            <button>Sign In <img src={arrow_icon} alt="arrow icon" /></button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
