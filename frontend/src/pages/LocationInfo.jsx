import { useLocation } from 'react-router-dom';
import '../css/LocationInfo.css'

function LocationInfo (){

    const location = useLocation();
    const locationInfo = location.state?.location;

    if (!locationInfo) {
        return <div className="location-info-page">No location data found</div>;
    }

    var sample_data = locationInfo;

    return (
        <div className="location-info-page">
            <div className='locationInfo'>
                <div className="location-images">
                    <img src={sample_data.images.img1} alt={sample_data.name+" img1"} className="slide" />
                    <img id="img2" src={sample_data.images.img2} alt={sample_data.name+" img2"} className="slide"/>
                </div>
                <div className="information">
                    <h2>{sample_data.name}</h2>
                    <h3><StarRating rating={sample_data.rating} /></h3>
                    <div className="main-info">
                        <h3>Feet: {sample_data.feet}</h3>
                        <h3>Climate: {sample_data.climate}</h3>
                        <h3>Pets: {sample_data.pets}</h3>   
                    </div>
                    
                    <div className="description">
                        <h2>Basic Information </h2>
                        <p>{sample_data.description}</p>
                    </div>

                    <div className="location-map">
                        <h2>Map Overview</h2>
                        <iframe src={sample_data.map} frameBorder="0"></iframe>
                    </div>

                    <div className="activities">
                        <h2>Activities</h2>
                        <Activities acts={sample_data.activities} />
                    </div>

                    <div className="cost">
                        <h2>Charges</h2>
                        <div className="cost-info">    
                            <h4>Food: {sample_data.charges.food}</h4>
                            <h4>Parking: {sample_data.charges.parking}</h4>
                            <h4>Visiting: {sample_data.charges.visiting}</h4>
                            <h4>Total Estimated Cost: {sample_data.charges.total}</h4>
                        </div> 
                    </div>

                    <div className="book">
                        <a href={sample_data.book_room}>Book Now</a>
                    </div>
                </div>
            </div>
        </div>
    );
}


function StarRating ({rating}){
    return <div className="rating">
        {rating == 5 ? (
            <p style={{color:"gold"}}>★★★★★</p>
        ) : (rating == 4.5 ? (
                <p style={{color:"gold"}}>★★★★⯪</p>
            ) : (rating == 4 ? (
                    <p style={{color:"goldenrod"}}>★★★★☆</p>
                ) : (rating == 3.5 ? (
                        <p style={{color:"yellow"}}>★★★⯪☆</p>
                    ) : (
                            <p style={{color:"yellow"}}>★★★☆☆</p>
                        )
                    )
                )
            )
        }
    </div>
}

function Activities ({acts}){
    console.log(acts);
    
    function objToArr(obj){
        if (!obj || typeof obj !== 'object') return [];
        var arr = [];
        var objLength = Object.keys(obj).length;
        for(let i=1; i<=objLength;i++){
            arr.push(obj[`act${i}`]);
        }
        return arr;
    }

    const act_list = objToArr(acts);

    return <div className="activity-list">
        {!acts || typeof(acts)==='string' ? (
            <h3>No Activities..</h3>
        ) : (
            act_list.map(activity => <ActivityCard act={activity} key={activity.id} />)
        )}
    </div>
}

function ActivityCard ({act}){
    return <div className="activity-card">
            <div className="activity-image">
                <img src={act.img1} alt={act.name} />
            </div>
            
            <div className="activity-info">
                <h3>{act.name.toUpperCase()}</h3>
                <p>{act.description}</p>
                <h4>Price: {act.cost}</h4>
            </div>
        </div>
}


export default LocationInfo;