import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function CompanyDetails() {
    const { companyId } = useParams();
    const [company, setCompany] = useState(null);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/companies/${companyId}`)
            .then(response => setCompany(response.data))
            .catch(error => console.error("Error fetching company details:", error));

        axios.get(`http://localhost:8000/companies/${companyId}/locations`)
            .then(response => setLocations(response.data))
            .catch(error => console.error("Error fetching company locations:", error));
    }, [companyId]);

    if (!company) return <div>Loading...</div>;

    return (
        <div>
            <h1>{company.name}</h1>
            <p>{company.address}</p>
            <MapContainer center={[company.latitude, company.longitude]} zoom={13} style={{ height: "400px", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations.map(location => (
                    <Marker key={location.location_id} position={[location.latitude, location.longitude]}>
                        <Popup>
                            {location.name}<br />{location.address}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            <ul>
                {locations.map(location => (
                    <li key={location.location_id}>
                        {location.name} - {location.address}
                    </li>
                ))}
            </ul>
            <Link to="/">Back to List</Link>
        </div>
    );
}

export default CompanyDetails;
