import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Typography, List, ListItem, ListItemText, TextField } from "@mui/material";

function CompanyList() {
    const [companies, setCompanies] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8000/companies")
            .then(response => setCompanies(response.data))
            .catch(error => console.error("Error fetching companies:", error));
    }, []);

    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Company List
            </Typography>
            <TextField
                label="Search Companies"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setSearch(e.target.value)}
            />
            <List>
                {filteredCompanies.map(company => (
                    <ListItem button component={Link} to={`/company/${company.company_id}`} key={company.company_id}>
                        <ListItemText
                            primary={company.name}
                            secondary={company.address}
                        />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
}

export default CompanyList;
