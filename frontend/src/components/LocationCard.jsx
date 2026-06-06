import { useFavorites } from '../contexts/FavLocContext';
import { useNavigate } from 'react-router-dom';
import '../css/LocationCard.css';

function LocationCard ({location}){

    const { favorites, toggleFavorite } = useFavorites();
    const navigate = useNavigate();
    const isFavorite = favorites.includes(location._id);


    return(
        <div className="location-card">
            <div className="loc-images" onClick={() => navigate('/locations/locationInfo', { state: { location } })}>
                <img src={location.images.img1} alt={location.name} />
            </div>
            
            <button onClick={()=> toggleFavorite(location._id)}>
                {isFavorite? "❤️" : "🤍"}
            </button>

            <div className="loc-info">
                <h2>{location.name}</h2>
                <h3><StarRating rating={location.rating}/></h3>
            </div>
        </div>
    );
}

function StarRating ({rating}){
    return <div className="rating">
        {rating == 5 ? (
            <p className="good">★★★★★</p>
        ) : (rating == 4.5 ? (
                <p className="good">★★★★⯪</p>
            ) : (rating == 4 ? (
                    <p className="good">★★★★☆</p>
                ) : (rating == 3.5 ? (
                        <p className="okay">★★★⯪☆</p>
                    ) : (
                            <p className="okay">★★★☆☆</p>
                        )
                    )
                )
            )
        }
    </div>
}


function Notify ({text}){
    return (
        <div className="notify">
            <h5>{text}</h5>
        </div>
    )
}

export default LocationCard;