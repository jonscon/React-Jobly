import React from "react";
import JobCard from "./JobCard";

/** Show page with job cards.
 * 
 *  Used by JobList and CompanyDetail to show list of jobs.
 *  Apply function prop will be called by JobCard on apply.
 * 
 *  JobList -> JobCardList -> JobCard
 *  CompanyDetail -> JobCardList -> JobCard
 */

function JobCardList({ jobs }) {
    return (
        <div className="JobCardList">
            {jobs.map(j => (
                <JobCard
                    key={j.id}
                    id={j.id}
                    title={j.title}
                    companyName={j.companyName}
                    salary={j.salary || 0}
                    equity={j.equity || 0}
                />
            ))};
        </div>
    )
}

export default JobCardList;