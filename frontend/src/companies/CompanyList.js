import React, { useState, useEffect } from "react";

import SearchForm from "../general/SearchForm";
import JoblyApi from "../api";
import CompanyCard from "./CompanyCard";
import LoadingSpinner from "../general/LoadingSpinner";

/** Show list of companies on company cards.
 * 
 *  On mount, loads companies from API.
 *  Re-loads filtered companies on submit from search form.
 * 
 *  Routed to at /companies.
 */

function CompanyList() {
    const [companies, setCompanies] = useState(null);

    /** Retrieve list of companies on load. */
    useEffect(() => {
        search();
    }, []);

    /** Pull list of companies. */
    async function search(name) {
        let companies = await JoblyApi.getCompanies(name);
        setCompanies(companies);
    }

    if (!companies) {
        return <LoadingSpinner />;
    }

    return (
        <div className="CompanyList">
            <SearchForm searchFor={search} />
            {companies ? (
                <div className="CompanyList-list">
                    {companies.map(c => (
                    <CompanyCard
                        key={c.handle}
                        handle={c.handle}
                        name={c.name}
                        description={c.description}
                        logoUrl={c.logoUrl}
                />
                ))};
                </div>
                ) : (
                    <p>Sorry, no results were found!</p>
                )
            }
        </div>
    )
}

export default CompanyList;