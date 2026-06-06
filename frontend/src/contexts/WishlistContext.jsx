import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);
    const [userType, setUserType] = useState('guest');
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUserType = localStorage.getItem('userType') || 'guest';
        const storedToken = localStorage.getItem('token');
        setUserType(storedUserType);
        setToken(storedToken);

        if (storedUserType === 'guest') {
            const stored = localStorage.getItem('equipmentWishlist');
            if (stored) {
                setWishlist(JSON.parse(stored));
            }
        } else if (storedToken) {
            // Load wishlist from API for account users
            fetchUserWishlist(storedToken);
        }
    }, []);

    const fetchUserWishlist = async (authToken) => {
        try {
            const response = await fetch('/api/user/data', {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setWishlist(data.wishlist || []);
            }
        } catch (error) {
            console.error('Error fetching user wishlist:', error);
        }
    };

    const toggleWishlist = async (id) => {
        if (userType === 'guest') {
            // Use localStorage for guests
            setWishlist((prev) => {
                const updated = prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id];
                localStorage.setItem('equipmentWishlist', JSON.stringify(updated));
                return updated;
            });
        } else if (token) {
            // Use API for account users
            try {
                const response = await fetch('/api/user/wishlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ equipmentId: id })
                });
                if (response.ok) {
                    const data = await response.json();
                    setWishlist(data.wishlist);
                }
            } catch (error) {
                console.error('Error updating wishlist:', error);
            }
        }
    };

    const removeFromWishlist = (id) => {
        if (userType === 'guest') {
            // Use localStorage for guests
            setWishlist((prev) => {
                const updated = prev.filter((itemId) => itemId !== id);
                localStorage.setItem('equipmentWishlist', JSON.stringify(updated));
                return updated;
            });
        } else if (token) {
            // Use API for account users - remove from wishlist
            toggleWishlist(id);
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => useContext(WishlistContext);
