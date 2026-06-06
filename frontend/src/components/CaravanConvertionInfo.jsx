import '../css/CaravanConvertionInfo.css'

const CaravanConvertionInfo = ({caraLoc}) => {

    return (
    <div className="caravan-info-card"> 
        <div className="caravan-info">
            <img src={caraLoc.image} alt={caraLoc.name} />
            <h2>{caraLoc.name}</h2>
            <h4>{caraLoc.rating}</h4>
            <div className="caravan-description">
                <p>{caraLoc.description}</p>
            </div>
            <h3>Phone No: {caraLoc.phone}</h3>
        </div>
        <div className="caravan-link">
            <a href={caraLoc.comlink} target="_blank" rel="noopener noreferrer" className="link">Visit Website</a>
        </div>
    </div>
    )
}

export default CaravanConvertionInfo;