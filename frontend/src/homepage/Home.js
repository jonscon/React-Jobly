import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Home.css";

/** Homepage.
 * 
 *  Shows welcome message if logged in.
 *  Shows login/signup buttons if logged out.
 * 
 *  Routed at /
 */

function Home() {
    const { currentUser } = useContext(UserContext);

    return (
        <div className="Home">
            <div className="container text-center">
                <h1>Jobly</h1>
                <p className="lead">A place for all things jobs!</p>
                {currentUser
                    ? <h2>
                        Welcome Back, {currentUser.firstName || currentUser.username}!
                    </h2>
                    : (
                        <p>
                            <Link className="btn btn-primary font-weight-bold mr-3"
                                  to="/login">
                                    Log In
                            </Link>
                            <Link className="btn btn-primary font-weight-bold"
                                  to="/signup">
                                    Sign Up
                            </Link>
                        </p>
                    )
                }
            </div>
        </div>
    )
}

export default Home;