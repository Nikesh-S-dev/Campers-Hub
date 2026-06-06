import '../css/ProductCard.css';
import { useWishlist } from '../contexts/WishlistContext.jsx';

function ProductCard ({product}){

    const { wishlist, toggleWishlist } = useWishlist();
    const isWishlisted = wishlist.includes(product._id);

    function onWishlistClick(){
        toggleWishlist(product._id);
    }

    return (
        <div className="product-card">
            <div className="product-poster">
                <img src={product.images.img1} alt={product.name}/>
                <img className="img2" src={product.images.img2} alt={product.name}/>

                <div className="product-overlay">
                    <button className="wishlist-btn" onClick={onWishlistClick}>
                        {isWishlisted ? "❤️" : "🤍"}
                    </button>
                    <a href={product["shoping link"]} className="addToCart-btn">
                        🧺
                    </a>
                </div>
            </div>
            <div className="product-info">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <h4>Suitability: {product.climate}</h4>
                    <h4>Price: {product.price}</h4>
            </div>  
        </div>
    );
}

export default ProductCard;