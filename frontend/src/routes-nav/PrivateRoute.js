import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../auth/UserContext";

/** Protect unauthorized users from accessing:
 *  - /companies or /companies/:handle
 *  - /jobs
 *  - /profile
 * 
 *  Rendered in Routes to check if there is a valid
 *  current user. If no user is present, redirect
 *  to login form.
 */

function PrivateRoute({ exact, path}) {
    const { currentUser } = useContext(UserContext);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    return <Outlet />
}

export default PrivateRoute;