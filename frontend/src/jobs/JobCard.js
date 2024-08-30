import React, { useState, useContext } from "react";
import UserContext from "../auth/UserContext";
import "./JobCard.css";

/** Show information on a job on a card.
 * 
 *  Rendered by JobCardList to show a job card.
 * 
 *  JobCardList -> JobCard
 */

function JobCard({ title, companyName, salary, equity, id }) {
    const { hasAppliedToJob, applyToJob } = useContext(UserContext);
    const [applied, setApplied] = useState();

    React.useEffect(() => {
        setApplied(hasAppliedToJob(id));
    }, [id, hasAppliedToJob]);

    /** Apply for a job. */
    async function handleApply(e) {
        if (hasAppliedToJob(id)) return;
        applyToJob(id);
        setApplied(true);
    }


    return (
        <div className="JobCard-body"> 
        {applied}
            <h5 className="JobCard-title">
                <strong>{title}</strong>
                {companyName}
            </h5>
            <p><small>Salary: {salary}</small></p>
            <p><small>Equity: {equity}</small></p>
            <button
                className="btn btn-danger font-weight-bold text-upperccase float-right"
                onClick={handleApply}
                disabled={applied}
            >
                {applied ? "Applied" : "Apply"}
            </button>
        </div>
    )
}

export default JobCard;