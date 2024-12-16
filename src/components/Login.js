import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Importing Redux hooks
import { setUserName, setUserPassword } from '../actions/LoginActions'; // Import actions

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Get state from Redux store
    const userName = useSelector((state) => state.login.userName);
    const userPassword = useSelector((state) => state.login.userPassword);

    const [errors, setErrors] = useState({
        userName: '',
        userPassword: '',
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Validate all fields
        let formIsValid = true;
        let errorMessages = {};

        if (!userName) {
            formIsValid = false;
            errorMessages.userName = 'Username is required';
        }

        if (!userPassword) {
            formIsValid = false;
            errorMessages.userPassword = 'Password is required';
        }

        setErrors(errorMessages);

        // If the form is valid, we can submit it
        if (formIsValid) {
            console.log('Form submitted');
            navigate('/dashboard'); // Navigate to dashboard page
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row no-gutters">
                    <div className="col-md-6 left-side d-flex justify-content-center align-items-center">
                        <img
                            src="/img/image3.png" // Replace with your image URL
                            alt="Background"
                            className="img-fluid"
                        />
                    </div>

                    <div className="col-md-6 login-right-side d-flex justify-content-center align-items-center">
                        <div className="login-form-section">
                            <h2 className="ms-2">Login</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12 mb-3">
                                            <label className="mb-2">User Name</label>
                                            <input
                                                type="text"
                                                placeholder="Enter your user name"
                                                className="form-control"
                                                value={userName} // Get value from Redux state
                                                onChange={(e) => dispatch(setUserName(e.target.value))} // Dispatch action to set value
                                            />
                                            {errors.userName && (
                                                <small className="text-danger">{errors.userName}</small>
                                            )}
                                        </div>

                                        <div className="col-md-12 mb-3">
                                            <label className="mb-2">Password</label>
                                            <input
                                                type="password"
                                                placeholder="Enter your password"
                                                className="form-control"
                                                value={userPassword} // Get value from Redux state
                                                onChange={(e) => dispatch(setUserPassword(e.target.value))} // Dispatch action to set value
                                            />
                                            {errors.userPassword && (
                                                <small className="text-danger">{errors.userPassword}</small>
                                            )}
                                        </div>
                                        <div className="col-md-12 mt-3">
                                            <button type="submit" className="btn btnsubmit w-100">
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
