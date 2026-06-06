import { getLocations } from '../services/api.js';
import { useState, useEffect } from 'react';
import LocationCard from '../components/LocationCard.jsx';
import { Link } from 'react-router-dom';
import '../css/Locations.css';


function Locations (){
    const [Locations, setLocations] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [filter_location, setFilter_location] = useState();
    
    useEffect(() => {
        const loadLocations = async () => {
            try{
                const location = await getLocations();
                setLocations(location);
            }catch(e){
                console.log(e);
            }finally{
                console.log("Finally");
                setLoading(false);
            }
        }
        loadLocations();
    }, []);


    async function handleSearch(e) {
        e.preventDefault();

        // if(!searchQuery.trim()) return;
        if(loading) return;

        const filter = await handleFilters(Locations);
        setFilter_location(filter);

        const search_filters = document.querySelector(".search-filters");
        search_filters.classList.replace("search-filters","search-filters-close")
    }

    return (
        <div className="locations">
            <h1>Locations</h1>
            <form onSubmit={handleSearch} className="search-form">
                <div className="search">
                    <input type="text" placeholder="Search for Locations..." id="search-input" className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                    <button type="button" onClick={()=>{document.querySelector(".search-filters-close").classList.replace("search-filters-close","search-filters")}}>Filters</button>
                    <Link to="/locations/favoriteLocations" className="fav-loc-link">Favs 💖</Link>
                </div>

                <div className="search-filters-close">
                    CATEGORY
                    <div className="category">
                        <label htmlFor="cb-forest"><input type="checkbox" id="cb-forest"/> Forest</label>
                        <label htmlFor="cb-mountain"><input type="checkbox" id="cb-mountain"/> Mountain</label>
                        <label htmlFor="cb-desert"><input type="checkbox" id="cb-desert"/> Desert</label>
                        <label htmlFor="cb-lake"><input type="checkbox" id="cb-lake"/> Lake</label>
                    </div>
                    <button type="submit">SEARCH</button>
                </div>
            </form>

            {loading ? (
                <h5 className='loading'>Loading...</h5>
            ) : ( 
                <div className="locations-container">
                    <div className="locations-grid">
                        {filter_location ? (
                            filter_location.map(location =>  
                                <LocationCard location={location} key={location._id} /> 
                            )
                            ) : ( searchQuery ? (
                                Locations.map(location =>  location.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                                    <LocationCard location={location} key={location._id} /> 
                                )
                                ) : (
                                    Locations.map(location =>  
                                        <LocationCard location={location} key={location._id} /> 
                                    )
                                )
                            )
                        }
                    </div>
                </div>
            )} 
        </div>
    );
}

export default Locations;

async function handleFilters(Locations) {
    const cat_forest = document.getElementById("cb-forest");
    const cat_lake = document.getElementById("cb-lake");
    const cat_mount = document.getElementById("cb-mountain");
    const cat_desert = document.getElementById("cb-desert");

    var filter=[];

    if(cat_forest.checked){ Locations.forEach(location =>{
        if(location.category.toLowerCase().includes("forest")){
            filter.push(location);
        }})
    }
    if(cat_lake.checked){ Locations.forEach(location =>{
        if(location.category.toLowerCase().includes("lake")){
            filter.push(location);
        }})
    }
    if(cat_mount.checked){ Locations.forEach(location =>{
        if(location.category.toLowerCase().includes("mountain")){
            filter.push(location);
        }})
    }
    if(cat_desert.checked){ Locations.forEach(location =>{
        if(location.category.toLowerCase().includes("desert")){
            filter.push(location);
        }})
    }
    
    if(filter.length == 0){
        return false;
    }
    return filter;
}