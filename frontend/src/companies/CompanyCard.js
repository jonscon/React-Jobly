import React from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css";

/** Show information on a company on a card.
 * 
 *  Rendered by CompanyList to show a company card.
 * 
 *  CompanyList -> CompanyCard
 */

function CompanyCard({ name, description, logoUrl, handle }) {
    return (
        <Link className="CompanyCard" to={`/companies/${handle}`}>
            <div className="CompanyCard-body">
                <h5 className="CompanyCard-title">
                    {name}
                    {logoUrl && <img src={logoUrl}
                                    alt={name} />}
                </h5>
                <p><small>{description}</small></p>
            </div>
        </Link>   
    )
}

export default CompanyCard;