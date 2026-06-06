
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { getEquipments } from '../services/api.js';
import { useWishlist } from '../contexts/WishlistContext.jsx';
import '../css/WishList.css';

function WishList (){
	const { wishlist } = useWishlist();
	const [equipments, setEquipments] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadEquipments = async () => {
			try{
				const products = await getEquipments();
				setEquipments(products);
			}catch(e){
				console.error(e);
			}finally{
				setLoading(false);
			}
		};
		loadEquipments();
	}, []);

	const wishlistedProducts = equipments.filter(product => wishlist.includes(product._id));

	return (
		<div className="wishlist-page">
			<h1>Wishlist</h1>
			{loading ? (
				<div className="loading">Loading...</div>
			) : wishlistedProducts.length > 0 ? (
				<div className="product-grid">
					{wishlistedProducts.map(product => (
						<ProductCard product={product} key={product._id} />
					))}
				</div>
			) : (
				<div className="empty-wishlist">Your wishlist is empty.</div>
			)}
		</div>
	);
}

export default WishList;