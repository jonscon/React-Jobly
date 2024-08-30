import React, { useState, useEffect } from "react";

import SearchForm from "../general/SearchForm";
import JoblyApi from "../api";
import JobCardList from "./JobCardList";
import LoadingSpinner from "../general/LoadingSpinner";

/** Show list of jobs on page.
 * 
 *  On mount, loads jobs from API.
 *  Re-loads filtered jobs on submit from search form.
 * 
 *  JobList -> JobCardList -> JobCard
 * 
 *  Routed to at /jobs
 */

function JobList() {
    const [jobs, setJobs] = useState(null);

    /** Retrieve list of jobs on load. */
    useEffect(() => {
        search();
    }, []);

    /** Pull list of jobs. */
    async function search(title) {
        let jobs = await JoblyApi.getJobs(title);
        setJobs(jobs);
    }

    if (!jobs) {
        return <LoadingSpinner />;
    }

    return (
        <div className="JobCardList">
            <SearchForm searchFor={search} />
            {jobs.length
                ? <JobCardList jobs={jobs} />
                : <p>Sorry, no results were found!</p>
            }
        </div>
    )
}

export default JobList;