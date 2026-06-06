import { createContext, useContext, useState, useEffect } from "react";

const FavLocContext = createContext();

export const FavoritesProvider = ({children}) =>{
    const [favorites, setFavorites] = useState([]);
    const [userType, setUserType] = useState('guest');
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUserType = localStorage.getItem('userType') || 'guest';
        const storedToken = localStorage.getItem('token');
        setUserType(storedUserType);
        setToken(storedToken);

        if (storedUserType === 'guest') {
            const stored = localStorage.getItem('favorites');
            if (stored) {
                setFavorites(JSON.parse(stored));
            }
        } else if (storedToken) {
            // Load favorites from API for account users
            fetchUserFavorites(storedToken);
        }
    }, []);

    const fetchUserFavorites = async (authToken) => {
        try {
            const response = await fetch('/api/user/data', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setFavorites(data.favorites || []);
            }
        } catch (error) {
            console.error('Error fetching user favorites:', error);
        }
    };

    const toggleFavorite = async (id) =>{
        if (userType === 'guest') {
            // Use localStorage for guests
            setFavorites((prev) => {
                const newFavs = prev.includes(id) ? prev.filter((favId) => favId !== id) : ([...prev,id]);
                localStorage.setItem('favorites', JSON.stringify(newFavs));
                return newFavs;
            });
        } else if (token) {
            // Use API for account users
            try {
                const response = await fetch('/api/user/favorites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ locationId: id })
                });
                if (response.ok) {
                    const data = await response.json();
                    setFavorites(data.favorites);
                }
            } catch (error) {
                console.error('Error updating favorites:', error);
            }
        }
    };

    return(
        <FavLocContext.Provider value={{favorites, toggleFavorite}}>
            {children}
        </FavLocContext.Provider>
    )
}

export const useFavorites = () => useContext(FavLocContext);