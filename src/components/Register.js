import React, { useState } from 'react';

const Register = () => {
    const [showModal, setShowModal] = useState(false);

    // Define state for error messages
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        address: '',
        nameOnCard: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        isChecked: '',
    });

    // Handle checkbox change
    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setErrors({
            ...errors,
            isChecked: isChecked ? '' : 'You must agree to the terms',
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
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

        if (!e.target.address.value) {
            formIsValid = false;
            errorMessages.address = 'Address is required';
        }

        if (!e.target.nameOnCard.value) {
            formIsValid = false;
            errorMessages.nameOnCard = 'Name on card is required';
        }
        const cardNumber = e.target.cardNumber.value;
        if (!cardNumber) {
            formIsValid = false;
            errorMessages.cardNumber = 'Credit card number is required';
        } else if (cardNumber.length !== 12) {
            formIsValid = false;
            errorMessages.cardNumber = 'Card number must be 12 digits';
        }

        const expirationDate = e.target.expirationDate.value;
        const expirationDateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
        if (!expirationDate) {
            formIsValid = false;
            errorMessages.expirationDate = 'Expiration date is required';
        } else if (!expirationDateRegex.test(expirationDate)) {
            formIsValid = false;
            errorMessages.expirationDate = 'Expiration date must be in MM/YYYY format';
        } else {
            // Extract month and year from the expiration date
            const [month, year] = expirationDate.split('/');
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth() + 1; // Months are zero-indexed, so add 1

            // Validate the year is not in the past
            if (parseInt(year) < currentYear) {
                formIsValid = false;
                errorMessages.expirationDate = 'your card is expired';
            } else if (parseInt(year) === currentYear && parseInt(month) < currentMonth) {
                formIsValid = false;
                errorMessages.expirationDate = 'your card is expired';
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

        if (!e.target.isChecked.checked) {
            formIsValid = false;
            errorMessages.isChecked = 'You must agree to the terms';
        }

        setErrors(errorMessages);

        // If the form is valid, we can submit it
        if (formIsValid) {
            console.log('Form submitted');
            setShowModal(true);
            // Submit form logic here, e.g., call an API
        }
    };
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row no-gutters">
                    <div className="col-md-6 left-side d-flex justify-content-center align-items-center">
                        <img
                            src="/img/ozy.png" // Replace with your image URL
                            alt="Background"
                            className="img-fluid"
                        />
                    </div>

                    <div className="col-md-6 right-side d-flex justify-content-center align-items-center">
                        <div className="login-form">
                            <h2>Enter your Card Details</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6 mb-2">
                                            <label className="mb-2">First Name</label>
                                            <input
                                                type="text"
                                                placeholder="Enter your First Name"
                                                className="form-control"
                                                name="firstName"
                                                required
                                            />
                                            {errors.firstName && (
                                                <small className="text-danger">{errors.firstName}</small>
                                            )}
                                        </div>

                                        <div className="col-md-6 mb-2">
                                            <label className="mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                placeholder="Enter your Last Name"
                                                className="form-control"
                                                name="lastName"
                                                required
                                            />
                                            {errors.lastName && (
                                                <small className="text-danger">{errors.lastName}</small>
                                            )}
                                        </div>

                                        <div className="col-md-12 mb-2">
                                            <label className="mb-2">Address</label>
                                            <input
                                                type="text"
                                                placeholder="Enter your Credit card billing address"
                                                className="form-control"
                                                name="address"
                                                required
                                            />
                                            {errors.address && (
                                                <small className="text-danger">{errors.address}</small>
                                            )}
                                        </div>

                                        <div className="col-md-12 mb-2">
                                            <label className="mb-2">Name on Card</label>
                                            <input
                                                type="text"
                                                placeholder="Enter First and Last name"
                                                className="form-control"
                                                name="nameOnCard"
                                                required
                                            />
                                            {errors.nameOnCard && (
                                                <small className="text-danger">{errors.nameOnCard}</small>
                                            )}
                                        </div>

                                        <div className="col-md-12 mb-2">
                                            <label className="mb-2">Credit Card Number</label>
                                            <input
                                                type="number"
                                                placeholder="Enter Credit card number"
                                                className="form-control"
                                                name="cardNumber"
                                                maxLength="12" 
                                                required
                                            />
                                            {errors.cardNumber && (
                                                <small className="text-danger">{errors.cardNumber}</small>
                                            )}
                                        </div>

                                        <div className="col-md-6 mb-2">
                                            <label className="mb-2">Expiration Date</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YYYY"
                                                className="form-control"
                                                name="expirationDate"
                                                required
                                            />
                                            {errors.expirationDate && (
                                                <small className="text-danger">{errors.expirationDate}</small>
                                            )}
                                        </div>

                                        <div className="col-md-6 mb-2">
                                            <label className="mb-2">CVV</label>
                                            <input
                                                type="number"
                                                placeholder="Enter CVV code"
                                                className="form-control"
                                                name="cvv"
                                                maxLength="3" 
                                                required
                                            />
                                            {errors.cvv && (
                                                <small className="text-danger">{errors.cvv}</small>
                                            )}
                                        </div>

                                        <div className="col-md-12 mb-2">
                                            <input
                                                type="checkbox"
                                                className="ml-1"
                                                name="isChecked"
                                                onChange={handleCheckboxChange}
                                            />
                                            I certify that I am of the age of majority in my respective jurisdiction or have permission from a legal parent or guardian to use this site. <br/>
                                            {errors.isChecked && (
                                                <small className="text-danger">{errors.isChecked}</small>
                                            )}
                                        </div>

                                        <div className="col-md-12">
                                            <button type="submit" className="btn btnsubmit w-100">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div class="modal ctm-popup" style={{ display:"block" }}>
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">Cozy Corners</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"  onClick={closeModal}></button>
                    </div>
                    <div class="modal-body">
                      <p>Thanks for your registeration</p>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                      
                    </div>
                  </div>
                </div>
              </div>
            )}

        </>
    );
};

export default Register;
