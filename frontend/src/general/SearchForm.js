import React, { useState } from "react";
import "./SearchForm.css";

/** Search form for filtering companies and jobs.
 * 
 *  Renders the search form and calls searchFor function
 *  prop that runs in parent.
 * 
 * { CompanyList, JobList } -> SearchForm
 */

function SearchForm({ searchFor }) {
    const [searchTerm, setSearchTerm] = useState("");

    /** Filters results after submission. */
    function handleSubmit(e) {
        e.preventDefault();
        // Trim to remove acccidental whitespaces in search
        searchFor(searchTerm.trim() || undefined);
        setSearchTerm(searchTerm.trim());
    }

    function handleChange(e) {
        setSearchTerm(e.target.value);
    }

    return (
        <div className="SearchForm mb-4">
            <form className="form-inline" onSubmit={handleSubmit}>
                <input
                    className="form-control form-control-lg"
                    name="searchTerm"
                    placeholder="Enter search term..."
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button type="submit" className="btn btn-lg btn-primary">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default SearchForm;