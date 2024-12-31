import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios

const Register = () => {
    
    const [expirationDate, setExpirationDate] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false); // Track if form is submitted
    const [contact, setContact] = useState(''); 
    const [message,setMessage]=useState('');
    // Define state for error messages
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        address: '',
        contact:'',
        email:'',
        nameOnCard: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        isChecked1: '',
        isChecked2: '',
    });
    useEffect(()=>{

    },[message]);
    // Handle checkbox change
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: checked ? '' : `You must agree to the terms`
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        // Validate all fields
        let formIsValid = true;
        let errorMessages = {};

        if (!e.target.firstName.value) {
            formIsValid = false;
            errorMessages.firstName = 'First name is required';
        }

        if (!e.target.lastName.value) {
            formIsValid = false;
            errorMessages.lastName = 'Last name is required';
        }

       // Validate contact number (mobile number)
       const contactRegex = /^[0-9+ -]*$/; // Allows digits, plus, and hyphen
       if (!contact) {
           formIsValid = false;
           errorMessages.contact = 'Phone number is required';
       } else if (!contactRegex.test(contact)) {
           formIsValid = false;
           errorMessages.contact = 'Phone number can only contain digits, +, and -';
       }

        if (!e.target.address.value) {
            formIsValid = false;
            errorMessages.address = 'Address is required';
        }
        if (!e.target.email.value) {
            formIsValid = false;
            errorMessages.email = 'Email is required';
        }

        if (!e.target.nameOnCard.value) {
            formIsValid = false;
            errorMessages.nameOnCard = 'Name on card is required';
        }
        const cardNumber = e.target.cardNumber.value;
        if (!cardNumber) {
            formIsValid = false;
            errorMessages.cardNumber = 'Credit card number is required';
        } else if (cardNumber.length !== 16) {
            formIsValid = false;
            errorMessages.cardNumber = 'Card number must be 16 digits';
        }

        const expirationDate = e.target.expirationDate.value;
        const expirationDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expirationDate) {
            formIsValid = false;
            errorMessages.expirationDate = 'Expiration date is required';
        } else if (!expirationDateRegex.test(expirationDate)) {
            formIsValid = false;
            errorMessages.expirationDate = 'Expiration date must be in MM/YY format';
        } else {
            const [month, year] = expirationDate.split('/');
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth() + 1; // Months are zero-indexed, so add 1
        
            // Convert 2-digit year to 4-digit year (assuming 21st century)
            const fullYear = 2000 + parseInt(year); 
        
            // Validate the year is not in the past
            if (fullYear < currentYear) {
                formIsValid = false;
                errorMessages.expirationDate = 'Your card is expired';
            } else if (fullYear === currentYear && parseInt(month) < currentMonth) {
                formIsValid = false;
                errorMessages.expirationDate = 'Your card is expired';
            }
        }

        const cvv = e.target.cvv.value;
        if (!cvv) {
            formIsValid = false;
            errorMessages.cvv = 'CVV is required';
        } else if (cvv.length !== 3) {
            formIsValid = false;
            errorMessages.cvv = 'CVV must be 3 digits';
        }

        if (!e.target.isChecked1.checked) {
            formIsValid = false;
            errorMessages.isChecked1 = 'You must agree to the age terms';
        }

        if (!e.target.isChecked2.checked) {
            formIsValid = false;
            errorMessages.isChecked2 = 'You must agree that you have read and agreed with the terms ';
        }


        setErrors(errorMessages);

        // If the form is valid, we can submit it
        if (formIsValid) {
            //setFormSubmitted(true); // Set formSubmitted to true when the form is successfully submitted 
            const formData = {
                firstName: e.target.firstName.value,
                lastName: e.target.lastName.value,
                contact:e.target.contact.value,
                Address: e.target.address.value,
                email:e.target.email.value,
                cardHolderName: e.target.nameOnCard.value,
                cardNo: e.target.cardNumber.value,
                expiryDate: e.target.expirationDate.value,
                cvvCode: e.target.cvv.value,

            };
            try {
                // Send POST request using axios
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}creditCards/register`, formData, {
                    headers: {
                        'Content-Type': 'application/json', // Set content type to JSON
                    },
                });
                // Handle successful response
                console.log(response.data);
                setMessage(response.data.message);
                setFormSubmitted(true); // Set formSubmitted to true when the form is successfully submitted 
            } catch (error) {
                // Handle error response
                console.error('Error submitting form:', error);
                // Optionally set an error state to display an error message to the user
            }
        }
    };

    const handleContactChange = (e) => {
        const inputValue = e.target.value;
        // Only allow digits, +, and - in the input
        const contactRegex = /^[0-9+ -]*$/;
        if (contactRegex.test(inputValue)) {
            setContact(inputValue); // Update state with valid input
        }
    };

    const handleExpirationDateChange = (e) => {
        let inputValue = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        if (inputValue.length <= 2) {
            inputValue = inputValue.replace(/(\d{2})(\d{0,2})/, '$1/$2'); // Add / after two digits
        } else if (inputValue.length > 2) {
            inputValue = inputValue.replace(/(\d{2})(\d{2})(\d{0,2})/, '$1/$2$3'); // Keep / after two digits
        }
        setExpirationDate(inputValue); // Update the state with the formatted value
    };

    return (
        <div className="container-fluid register-screen">
            <div className="row no-gutters">
                <div className="col-md-5 left-side d-flex justify-content-center align-items-center">
                    <img
                        src="/img/ozy.png" // Replace with your image URL
                        alt="Background"
                        className="img-fluid register"
                    />
                </div>

                <div className="col-md-7 login-right-side right-side d-flex justify-content-center align-items-center">
                    {formSubmitted ? (
                        // Show thank-you message after form submission
                        <div className="login-form thank-you-message">
                            <h1>Thank you for your submission in Cozy Corners!</h1>
                            <p>{message}</p>
                        </div>
                    ) : (
                        // Show form if not submitted
                        <div className="login-form login-form-section">
                            <h2>Enter Your Card Details</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6 mb-1">
                                            <label className="mb-1">First Name</label>
                                            <input
                                                type="text"
                                                placeholder="Enter your first name"
                                                className="form-control"
                                                name="firstName"
                                                required
                                            />
                                            {errors.firstName && (
                                                <small className="text-danger">{errors.firstName}</small>
                                            )}
                                        </div>

                                        <div className="col-md-6 mb-1">
                                            <label className="mb-1">Last Name</label>
                                            <input
                                                type="text"
                                                placeholder="Enter your last name"
                                                className="form-control"
                                                name="lastName"
                                                required
                                            />
                                            {errors.lastName && (
                                                <small className="text-danger">{errors.lastName}</small>
                                            )}
                                        </div>
                                        <div className="col-md-12 mb-1">
                                            <label className="mb-1">Phone Number</label>
                                            <input
                                                type="text"
                                                placeholder="Enter your phone number"
                                                className="form-control"
                                                name="contact"
                                                value={contact}
                                                onChange={handleContactChange} 
                                                required
                                            />
                                            {errors.contact && (
                                                <small className="text-danger">{errors.contact}</small>
                                            )}
                                        </div>
                                        <div className="col-md-12 mb-1">
                                            <label className="mb-1">Address</label>
                                            <input
                                                type="text"
                                                placeholder="Enter your credit card billing address"
                                                className="form-control"
                                                name="address"
                                                required
                                            />
                                            {errors.address && (
                                                <small className="text-danger">{errors.address}</small>
                                            )}
                                        </div>
                                        <div className="col-md-12 mb-1">
                                            <label className="mb-1">Email</label>
                                            <input
                                                type="email"
                                                placeholder="Enter your credit card billing address"
                                                className="form-control"
                                                name="email"
                                                required
                                            />
                                            {errors.email && (
                                                <small className="text-danger">{errors.email}</small>
                                            )}
                                        </div>
                                        <div className="col-md-12 mb-1">
                                            <label className="mb-1">Name on Card</label>
                                            <input
                                                type="text"
                                                placeholder="Enter first and last name"
                                                className="form-control"
                                                name="nameOnCard"
                                                required
                                            />
                                            {errors.nameOnCard && (
                                                <small className="text-danger">{errors.nameOnCard}</small>
                                            )}
                                        </div>

                                        <div className="col-md-12 mb-1">
                                            <label className="mb-1">Credit Card Number</label>
                                            <input
                                                type="number"
                                                placeholder="Enter credit card number"
                                                className="form-control"
                                                name="cardNumber"
                                                maxLength="12" 
                                                required
                                            />
                                            {errors.cardNumber && (
                                                <small className="text-danger">{errors.cardNumber}</small>
                                            )}
                                        </div>

                                        <div className="col-md-6 mb-1">
                                            <label className="mb-1">Expiration Date</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="form-control"
                                                name="expirationDate"
                                                maxLength="5" 
                                                required
                                                value={expirationDate}
                                                onChange={handleExpirationDateChange} // Add onChange to update input value
                                            />
                                            {errors.expirationDate && (
                                                <small className="text-danger">{errors.expirationDate}</small>
                                            )}
                                        </div>

                                        <div className="col-md-6 mb-2">
                                            <label className="mb-1">CVV</label>
                                            <input
                                                type="number"
                                                placeholder="Enter cvv code"
                                                className="form-control"
                                                name="cvv"
                                                maxLength="3" 
                                                required
                                            />
                                            {errors.cvv && (
                                                <small className="text-danger">{errors.cvv}</small>
                                            )}
                                        </div>

                                        <div className="col-md-12 mb-2 mt-2">
                                            <div className="checkbox-wrapper">
                                                <input
                                                    type="checkbox"
                                                    className="ml-1"
                                                    name="isChecked1"
                                                    onChange={handleCheckboxChange}
                                                />
                                                <span className="checkbox-text">I certify that I am of the age of majority in my respective jurisdiction or have permission from a legal parent or guardian to use this site. </span><br/>
                                                </div>
                                                {errors.isChecked1 && (
                                                    <small className="text-danger ms-4">{errors.isChecked1}</small>
                                                )}
                                            
                                        </div>
                                        <div className="col-md-12 mb-2 mt-2">
                                            <div className="checkbox-wrapper">
                                                <input
                                                        type="checkbox"
                                                        className="ml-1"
                                                        name="isChecked2"
                                                        onChange={handleCheckboxChange}
                                                    />
                                                <span className="checkbox-text">Check here to indicate that you have read and agreed to the terms of 
                                                        <a href="/doc/global_privacy_statement.pdf"> Global Privacy Statement, </a> 
                                                        <a href="/doc/site_usage_agreement.pdf">Site Usage Agreement </a> and 
                                                        <a href="/doc/Rules_and_Restrictions.pdf"> Rules and Restrictions </a><br/>
                                                </span>
                                                </div>
                                                {errors.isChecked2 && (
                                                    <small className="text-danger ms-4">{errors.isChecked2}</small>
                                                )}
                                            
                                        </div>
                                        <div className="col-md-12 mt-2">
                                            <button type="submit" className="btn btnsubmit w-100">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Register;
