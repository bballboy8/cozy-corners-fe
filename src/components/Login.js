import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Importing Redux hooks
import { setUserName, setToken  } from '../actions/LoginActions'; // Import actions
import axios from 'axios'; // Import axios

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userName, setUserName] = useState(''); // Local state for userName
    const [userPassword, setUserPassword] = useState(''); // Local state for userPassword
    
    
    const [formSubmitted, setFormSubmitted] = useState(false);

    

    const [errors, setErrors] = useState({
        userName: '',
        userPassword: '',
        loginError: '', // Added state for login error message
    });

    // Handle form submission
    const handleSubmit = async (e) => {
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
            const formData = {
                email: userName, // Get value from local state
                password: userPassword, // Get value from local state
            };
            try {
                // Send POST request using axios
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/login`, formData, {
                    headers: {
                        'Content-Type': 'application/json', // Set content type to JSON
                    },
                });
                
                // Handle successful response
                dispatch(setToken(response.data.token));
                localStorage.setItem('token', response.data.token);
                setFormSubmitted(true); // Set formSubmitted to true when the form is successfully submitted 
                navigate('/dashboard'); // Navigate to dashboard page
            } catch (error) {
                console.log(error.response);
                if (error.response && error.response.status === 400) {
                    // If the status code is 401 (Unauthorized), display login error message
                    setErrors({
                        ...errors,
                        loginError: 'Invalid username or password. Please try again.',
                    });
                } else {
                    // Handle other errors (e.g., server errors)
                    setErrors({
                        ...errors,
                        loginError: 'An error occurred. Please try again later.',
                    });
                }
            }

            
            
        }
    };

    return (
        <>
            <div className="container-fluid login-screen">
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
                                                value={userName} // Get value from local state
                                                onChange={(e) => setUserName(e.target.value)} // Dispatch action to set value
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
                                                value={userPassword} // Get value from local state
                                                onChange={(e) => setUserPassword(e.target.value)}  // Dispatch action to set value
                                            />
                                            {errors.userPassword && (
                                                <small className="text-danger">{errors.userPassword}</small>
                                            )}
                                        </div>
                                        {errors.loginError && (
                                            <div className="col-md-12 mb-3">
                                                <small className="text-danger">{errors.loginError}</small>
                                            </div>
                                        )}
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
