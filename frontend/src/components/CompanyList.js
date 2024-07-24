import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CompanyList() {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/companies")
            .then(response => setCompanies(response.data))
            .catch(error => console.error("Error fetching companies:", error));
    }, []);

    return (
        <div>
            <h1>Company List</h1>
            <ul>
                {companies.map(company => (
                    <li key={company.company_id}>
                        <Link to={`/company/${company.company_id}`}>
                            {company.name} - {company.address}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CompanyList;
