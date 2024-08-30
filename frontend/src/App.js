import React, { useState, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import NavBar from "./routes-nav/NavBar";
import ReactRoutes from "./routes-nav/Routes";
import LoadingSpinner from './general/LoadingSpinner';
import JoblyApi from './api';
import UserContext from './auth/UserContext';
import jwt from "jsonwebtoken";

// Key name for localStorage - used for "remember me" when logging back in
export const TOKEN_STORAGE_ID = "jobly-token";

/** Jobly Application.
 * 
 *  - infoLoaded: checks if user data has been pulled from API.
 * 
 *  - currentUser: user object from API. Used to tell if someone
 *    is logged in. This is passed around through context
 *    throughout app.
 * 
 *  - token: for logged in users, this is their authentication JWT.
 *    Required to be set for most API calls. This is initially read
 *    from localStorage and synced to there via useLocalStorage hook.
 */

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          // set token on Api class so it can be used to call API.
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    // while currentUser is running, set infoLoaded to false.
    // once data is fetched (or error occurs), set back to 
    // false for loading spinner
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  /** Handles signup. */
  async function signup(data) {
    try {
      let token = await JoblyApi.signup(data);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("signup failed", err);
      return { success: false, err };
    }
  }

  /** Handles login. */
  async function login(data) {
    try {
      let token = await JoblyApi.login(data);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("login failed", err);
      return { success: false, err };
    }
  }

  /** Handles logout. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Check if job has been applied to */
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  /** Apply to a job. Make API call and update set of application IDs. */

  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  if (!infoLoaded) return <LoadingSpinner />

  return (
    <BrowserRouter>
      <UserContext.Provider
          value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}>
        <div className="App">
          <NavBar logout={logout} />
          <ReactRoutes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
