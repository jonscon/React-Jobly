import React, { useState, useContext } from "react";
import Alert from "../general/Alert";
import JoblyApi from "../api";
import UserContext from "../auth/UserContext";
import "./ProfileForm.css";

/** Edit profile form.
 * 
 *  Displays profile form and handles change to form state.
 *  Submitting the form calls the API to save new info and 
 *  reloads site.
 * 
 *  If successful save, an <Alert> will show. 
 * 
 *  Routed as /profile
 *  Routes -> ProfileForm -> Alert
 */

function ProfileForm() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        username: currentUser.username,
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);

    const [saveConfirmed, setSaveConfirmed] = useState(false);

    /** On form submit, save info to backend and report any errors.
     *  if successful
     *  - clear previous error messages and password
     *  - show "save confirmed" message
     *  - set current user info throughout site
     */
    async function handleSubmit(e) {
        e.preventDefault();

        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
        };

        let username = formData.username;
        let updatedUser;

        try {
            updatedUser = await JoblyApi.saveProfile(username, profileData);
        } catch(err) {
            setFormErrors(err);
            return;
        }

        setFormData(data => ({ ...data, password: "" }));
        setFormErrors([]);
        setSaveConfirmed(true);
        setCurrentUser(updatedUser);
    }

    /** Handle form change to update state. */
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({
            ...data,
            [name]: value
        }));
        setFormErrors([]);
    }

    return (
        <div className="ProfileForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h3 className="mb-3">Profile</h3>

                <div className="card">
                    <div className="card-body">
                        <form className="ProfileForm-form">
                            <div className="form-group">
                                <label>Username</label>
                                <p className="form-control-plaintext">{formData.username}</p>
                            </div>

                            <div className="form-group">
                                <label>First Name</label>
                                <input
                                    name="firstName"
                                    className="form-control"
                                    value={formData.firstName}
                                    onChange={handleChange}                                    
                                />
                            </div>

                            <div className="form-group">
                                <label>Last Name</label>
                                <input
                                    name="lastName"
                                    className="form-control"
                                    value={formData.lastName}
                                    onChange={handleChange}                                    
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Confirm password to make changes</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>

                            {formErrors.length
                                ? <Alert type="danger" messages={formErrors} />
                                : null}

                            {saveConfirmed
                                ? <Alert type="success" messages={["Updated successfully."]} />
                                : null}

                                <button 
                                    className="btn btn-primary btn-block mt-4" 
                                    onClick={handleSubmit}>
                                        Submit
                                </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileForm;