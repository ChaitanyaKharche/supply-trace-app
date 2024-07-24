import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Card, CardContent, List, ListItem, ListItemText, Button } from "@mui/material";
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
        <Container>
            <Typography variant="h4" gutterBottom>
                {company.name}
            </Typography>
            <Card>
                <CardContent>
                    <Typography variant="h6">
                        Address
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {company.address}
                    </Typography>
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
                </CardContent>
            </Card>
            <Typography variant="h6" gutterBottom>
                Locations
            </Typography>
            <List>
                {locations.map(location => (
                    <ListItem key={location.location_id}>
                        <ListItemText
                            primary={location.name}
                            secondary={location.address}
                        />
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" color="primary" component={Link} to="/" style={{ marginTop: "16px" }}>
                Back to List
            </Button>
        </Container>
    );
}

export default CompanyDetails;
