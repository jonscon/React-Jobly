import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../homepage/Home";
import CompanyList from "../companies/CompanyList";
import CompanyDetails from "../companies/CompanyDetails";
import JobList from "../jobs/JobList";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import ProfileForm from "../profile/ProfileForm";
import PrivateRoute from "./PrivateRoute";

function ReactRoutes({ login, signup }) {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginForm login={login}/>} />
                <Route path="/signup" element={<SignupForm signup={signup}/>} />

                <Route element={<PrivateRoute />}>
                    <Route path="/companies" element={<CompanyList />} />
                    <Route path="/companies/:handle" element={<CompanyDetails />} />
                    <Route path="/jobs" element={<JobList />} />
                    <Route path="/profile" element={<ProfileForm />} />
                </Route>
                
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>

    )
}

export default ReactRoutes;