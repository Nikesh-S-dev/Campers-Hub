
export async function getEquipments () {
    const response = await fetch('http://localhost:5000/api/equipments');
    const data = await response.json();
    return data.data || [];
}

export async function getLocations () {
    const response = await fetch('http://localhost:5000/api/locations');
    const data = await response.json();
    return data.data || [];
}

export async function searchLocations (query) {
    const response = await fetch(`http://localhost:5000/api/locations&query=${encodeURIComponent(
        query
    )}`);
    const data = await response.json();
    console.log(data.data);
    return data.data || [];
}