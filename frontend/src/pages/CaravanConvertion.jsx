import { useState } from 'react';
import CaravanConvertionInfo from '../components/CaravanConvertionInfo';
import { getData } from '../services/Data.js'
import '../css/CaravanConvertion.css';

function CaravanConvertion(){

    const [caravan_location, setCaravanLocation] = useState("");

    const Data = getData();

    function handleCaravanClick(selection){
        setCaravanLocation(selection);
    }

    return(
        <div className="caravan">
            <h1>Caravan Convertion</h1>

            <nav>
                <a href="#company-info" style={{textDecoration:"none"}}>
                    <div className="caravan-locations">
                        <button onClick={() => handleCaravanClick("karnataka")}>Karnataka</button>
                        <button onClick={() => handleCaravanClick("andhra")}>Andra Pradesh</button>
                        <button onClick={() => handleCaravanClick("kerala")}>Kerala</button>
                        <button onClick={() => handleCaravanClick("tamilnadu")}>Tamil Nadu</button>
                        <button onClick={() => handleCaravanClick("goa")}>Goa</button>
                        <button onClick={() => handleCaravanClick("gujarat")}>Gujarat</button>
                    </div>
                </a>
            </nav>

            <div id="company-info" className="caravan-information">
                {
                    Data[caravan_location] && <h2>Caravan Companies</h2>
                }
                <div className="caravan-companies">
                    {Data[caravan_location] ? (
                    Data[caravan_location].map(data => <CaravanConvertionInfo caraLoc={data} key={data.id}/>)
                ) : (
                    <h3>No Locations selected.. Please click on a location to view residing companies</h3>
                )}
                </div>
            </div>
        </div>
    )
}

export default CaravanConvertion;