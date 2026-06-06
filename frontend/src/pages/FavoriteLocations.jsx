import { useState, useEffect } from 'react';
import LocationCard from "../components/LocationCard";
import LocationInfo from "./LocationInfo";
import { useFavorites } from "../contexts/FavLocContext";
import { getLocations } from "../services/api";
import "../css/FavoriteLocations.css"

function FavoriteLocations () {
    const { favorites } = useFavorites();
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        const loadLocations = async () => {
            try {
                const locs = await getLocations();
                setLocations(locs);
            } catch (error) {
                console.error("Error loading locations:", error);
            } finally {
                setLoading(false);
            }
        };
        loadLocations();
    }, []);

    const favoriteLocations = locations.filter(loc => favorites.includes(loc._id));

    return (
        <div className="fav-loc">
            <h1>Favorite Locatios</h1>
            {loading ? (
                <h5>Loading...</h5>
            ) : (
                <div className={`locations-container${selectedLocation ? ' with-info' : ''}`}>
                    <div className="fav-loc-grid">
                        {favoriteLocations.length > 0 ? (
                            favoriteLocations.map(loc => (
                                <LocationCard location={loc} key={loc._id} onSelect={() => setSelectedLocation(loc)} />
                            ))
                        ) : (
                            <h2>No Favorites Yet...</h2>
                        )}
                    </div>
                    {selectedLocation != null && (
                        <div className="locationInfo-panel">
                            <button onClick={() => setSelectedLocation(null)}>🗙</button>
                            <LocationInfo locationInfo={selectedLocation} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default FavoriteLocations;