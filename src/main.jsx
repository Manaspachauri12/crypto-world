import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx';
import { HashRouter } from 'react-router-dom';
import CoinContextProvider from './context/CoinContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>  {/* Use HashRouter instead of BrowserRouter */}
      <CoinContextProvider>
        <Auth0Provider
          domain="dev-pv7d0sprxrlcgd1d.us.auth0.com"
          clientId="ytxIUWnobsoiA9qeouylTcwr864e70cR"
          authorizationParams={{
            redirect_uri: `${window.location.origin}/#/` // Fix Auth0 redirect issue
          }}
        >
          <App />
        </Auth0Provider>
      </CoinContextProvider>
    </HashRouter>
  </StrictMode>
);

