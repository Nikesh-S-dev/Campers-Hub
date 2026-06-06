import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home.jsx';
import Equipments from './pages/Equipments.jsx';
import NavBar from './components/NavBar.jsx';
import WishList from './pages/WishList.jsx';
import Locations from './pages/Locations.jsx';
import LocationInfo from './pages/LocationInfo.jsx';
import FavoriteLocations from './pages/FavoriteLocations.jsx';
import CaravanConvertion from './pages/CaravanConvertion.jsx';
import Login from './pages/Login.jsx';

import { FavoritesProvider } from './contexts/FavLocContext';
import { WishlistProvider } from './contexts/WishlistContext';

import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <FavoritesProvider>
      <WishlistProvider>
        <div>
          <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <main className="main-content">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/equipments" element={<Equipments />} />
              <Route path="/wishlist" element={<WishList />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/locations/favoriteLocations" element={<FavoriteLocations />} />
              <Route path="/locations/locationInfo" element={<LocationInfo />} />
              <Route path="/caravanConvertion" element={<CaravanConvertion />}/>
              <Route path="/" element={<Login />} />
            </Routes>
          </main>
        </div>
      </WishlistProvider>
    </FavoritesProvider>
  );
}

export default App;
