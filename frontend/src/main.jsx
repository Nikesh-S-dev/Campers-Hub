import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import { FavoritesProvider } from './contexts/FavLocContext.jsx';
import { WishlistProvider } from './contexts/WishlistContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <FavoritesProvider>
        <WishlistProvider>
        <App />
        </WishlistProvider>
      </FavoritesProvider>
    </HashRouter>
  </StrictMode>,
);