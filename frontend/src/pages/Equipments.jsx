import ProductCard from '../components/ProductCard.jsx';
import { getEquipments } from '../services/api.js';
import { useState, useEffect } from 'react';
import '../css/Equipments.css';
import { Link } from 'react-router-dom';


function Equipments (){

    const [Equipments, setEquipments] = useState([]);
    const [searchQuery, setSearchQuery] = useState();
    const [filter_equipment, setFilter_Equipment] = useState();


    useEffect(() => {
        const loadEquipments = async () => {
            try{
                const products = await getEquipments();
                setEquipments(products);
            }catch(e){
                console.log(e);
            }
        }
        loadEquipments();
    }, []);

    async function handleSearch(e) {
        e.preventDefault();

        const filter = await handleFilters(Equipments);
        setFilter_Equipment(filter);

        const search_filters = document.querySelector(".search-filters");
        search_filters.classList.replace("search-filters","search-filters-close")
    }

    
    return (
        <div className="equipments-page">
            <h1>Equipments</h1>
            <form onSubmit={handleSearch} className="search-form">
                <div className="search">
                    <input type="text" placeholder="Search for Equipments..." id="search-input" className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                    <button type="button" onClick={()=>{document.querySelector(".search-filters-close").classList.replace("search-filters-close","search-filters")}}>Filters</button>
                    <Link to="/wishlist" className="wishlist-link">Wishlist 💖</Link>
                </div>

                <div className="search-filters-close">
                    <h3>CLIMATE</h3>
                    <div className="climate">
                        <label htmlFor="cb-snow"><input type="checkbox" id="cb-snow"/> Snow</label>
                        <label htmlFor="cb-rainy"><input type="checkbox" id="cb-rainy"/> Rainy</label>
                        <label htmlFor="cb-hot"><input type="checkbox" id="cb-hot"/> Hot</label>
                        <label htmlFor="cb-all"><input type="checkbox" id="cb-all"/> All Climate</label>
                    </div>
                    <button type="submit">SEARCH</button>
                </div>
            </form>

            <div className="product-grid">
                {filter_equipment ? (
                    filter_equipment.map(product =>  
                        <ProductCard product={product} key={product._id}/> 
                    )
                    ) : ( searchQuery ? (
                        Equipments.map(product =>  product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                            <ProductCard product={product} key={product._id}/> 
                        )
                        ) : (
                            Equipments.map(product => 
                                <ProductCard product={product} key={product._id} /> 
                            )
                        )
                    )
                }
            </div>
        </div>
    );
}

async function handleFilters(Equipments) {
    const cli_snow = document.getElementById("cb-snow");
    const cli_rainy = document.getElementById("cb-rainy");
    const cli_hot = document.getElementById("cb-hot");
    const cli_all = document.getElementById("cb-all");

    var filter=[];

    if(cli_snow.checked){ Equipments.forEach(equipment =>{
        if(equipment.climate.toLowerCase().includes("snow")){
            filter.push(equipment);
        }})  
    }
    if(cli_rainy.checked){ Equipments.forEach(equipment =>{
        if(equipment.climate.toLowerCase().includes("rainy")){
            filter.push(equipment);
        }})
    }
    if(cli_hot.checked){ Equipments.forEach(equipment =>{
        if(equipment.climate.toLowerCase().includes("hot")){
            filter.push(equipment);
        }})
    }
    if(cli_all.checked){ Equipments.forEach(equipment =>{
        if(equipment.climate.toLowerCase().includes("all")){
            filter.push(equipment);
        }})
    }
    return filter;
}

export default Equipments;