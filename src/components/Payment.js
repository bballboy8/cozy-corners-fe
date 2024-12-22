import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
const Payment = () => {
       // Define state for error message
       const dispatch = useDispatch();
       const [cards, setCards] = useState([]); // State to store card details
       const [formData, setFormData] = useState({
        nameOnCard: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        amount: '',
        paymentOption: 'charge',
    });


       const [errors, setErrors] = useState({
           nameOnCard: '',
           cardNumber: '',
           expirationDate: '',
           cvv: '',
           amount: '',
           paymentOption: '',
       });
       
       const [expirationDate, setExpirationDate] = useState('');  
       const stripe = useStripe();
       const elements = useElements();

       const handleInputChange = (e) => {
         const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
        };

       useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/creditCards/all'); // Replace with your API URL
                console.log(response.data);
                setCards(response.data.cards); // Set fetched cards to state
            } catch (error) {
                console.error('Error fetching card details:', error);
            }
        };

        fetchCards();
    }, []); // Empty dependency array ensures this runs only once

    const handlePayAgain = async (cardId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/creditCards/${cardId}`);
            const card = response.data.card; // Adjust based on API response structure
            setFormData({
                nameOnCard: `${card.firstName} ${card.lastName}`,
                cardNumber: card.cardNo,
                expirationDate: card.expiryDate,
                cvv: card.cvvCode,
                amount: '', // Keep amount empty for user to enter
                paymentOption: 'charge', // Default payment option
            });
        } catch (error) {
            console.error('Error fetching card details:', error);
        }
    };

       
       // Handle form submission
       const handleSubmit = async (e) => {
           e.preventDefault(); // Prevent default form submission
   
           // Validate all fields
           let formIsValid = true;
           let errorMessages = {};
           if (!stripe || !elements) {
            // Stripe.js has not yet loaded
                return;
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
               errorMessages.expirationDate = 'date is required';
           } else if (!expirationDateRegex.test(expirationDate)) {
               formIsValid = false;
               errorMessages.expirationDate = 'date must be in MM/YYYY';
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
   
            if (!e.target.amount.value) {
               formIsValid = false;
               errorMessages.amount = 'amount is required';
           }

           const paymentOption = e.target.paymentOption.value;
           if (!paymentOption) {
               formIsValid = false;
               errorMessages.paymentOption = 'Please select a payment option';
           }

           setErrors(errorMessages);
   
           // If the form is valid, we can submit it
           if (formIsValid) {
            const cardElement = elements.getElement(CardElement);
            const { token, error } = await stripe.createToken(cardElement);
            if (error) {
                console.error(error);
                setErrors({ general: error.message });
                return;
            }
            try {
                console.log()
                const response = await axios.post('http://localhost:5000/api/creditCards/charge-payment', {
                    token: token.id,
                    amount: formData.amount, // Amount in cents
                });

                if (response.data.success) {
                    alert('Payment successful');
                } else {
                    setErrors({ general: response.data.message });
                }
            } catch (error) {
                setErrors({ general: 'Payment failed. Please try again.' });
                console.error('Error:', error);
            }
            
               // Submit form logic here, e.g., call an API
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
        <>
            <div className="container-fluid dashboard-screen">
                <div className="row no-gutters mt-4">
                    <div className="col-md-6 right-side fix-height d-flex justify-content-center align-items-center">
                        <div className="login-form dashboard mt-5">
                            <h2>Enter Card Details</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12 mb-2">
                                            <label className="mb-2">Name on Card</label>
                                            <input
                                                type="text"
                                                placeholder="Enter first and last name"
                                                className="form-control"
                                                name="nameOnCard"
                                                value={formData.nameOnCard}
                                                onChange={(e) => setFormData({ ...formData, nameOnCard: e.target.value })}
                                            />
                                            {errors.nameOnCard && <small className="text-danger">{errors.nameOnCard}</small>}
                                        </div>

                                        <div className="col-md-12 mb-2">
                                            <label className="mb-2">Credit Card Number</label>
                                            <input
                                                type="text"
                                                placeholder="Enter credit card number"
                                                className="form-control"
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                                            />
                                            {errors.cardNumber && <small className="text-danger">{errors.cardNumber}</small>}
                                        </div>

                                        <div className="col-md-6 mb-2">
                                            <label className="mb-2">Expiration Date</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                className="form-control"
                                                name="expirationDate"
                                                value={formData.expirationDate}
                                                onChange={handleExpirationDateChange}
                                            />
                                            {errors.expirationDate && <small className="text-danger">{errors.expirationDate}</small>}
                                        </div>

                                        <div className="col-md-6 mb-2">
                                            <label className="mb-2">CVV</label>
                                            <input
                                                type="text"
                                                placeholder="Enter CVV code"
                                                className="form-control"
                                                name="cvv"
                                                value={formData.cvv}
                                                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                                            />
                                            {errors.cvv && <small className="text-danger">{errors.cvv}</small>}
                                        </div>
                                        <div className="col-md-12 mb-2">
                                            <label className="mb-2">Payment Option</label>
                                            <div>
                                                <input
                                                    type="radio"
                                                    id="charge"
                                                    name="paymentOption"
                                                    value="charge"
                                                    checked={formData.paymentOption === 'charge'}
                                                    onChange={(e) => setFormData({ ...formData, paymentOption: e.target.value })}
                                                />
                                                <label htmlFor="charge" className="ms-2 me-2">Charge</label>

                                                <input
                                                    type="radio"
                                                    id="hold"
                                                    name="paymentOption"
                                                    value="hold"
                                                    checked={formData.paymentOption === 'hold'}
                                                    onChange={(e) => setFormData({ ...formData, paymentOption: e.target.value })}
                                                />
                                                <label htmlFor="hold" className="ms-2">Hold</label>
                                            </div>
                                            {errors.paymentOption && <small className="text-danger">{errors.paymentOption}</small>}
                                        </div>

                                        <div className="col-md-12 mb-2">
                                            <label className="mb-2">Enter Amount</label>
                                            <input
                                                type="number"
                                                placeholder="Enter Amount"
                                                className="form-control"
                                                name="amount"
                                                value={formData.amount}
                                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                            />
                                            {errors.amount && <small className="text-danger">{errors.amount}</small>}
                                        </div>

                                        <div className="col-md-12">
                                            <button type="submit" className="btn btnsubmit w-100 mt-2" disabled={!stripe}>
                                                Pay Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6 dashboard-right-side left-side fix-height d-flex justify-content-center align-items-center">
                        <img src="/img/ozy.png" alt="Background" className="img-fluid" />
                    </div>
                    <div className='col-md-12 ms-5 ctm-width'>
                            <h2 className='ms-1'>Credit Cards on File Details</h2>
                            <div className='bdrRadius'>
                                <div className="table-responsive">
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th className='bg-head'>First Name</th>
                                            <th className='bg-head'>Last Name</th>
                                            <th className='bg-head'>Phone No</th>
                                            <th className='bg-head'>Address</th>
                                            <th className='bg-head'>Card Number</th>
                                            <th className='bg-head'>Expiry Date</th>
                                            <th className='bg-head'>CVV code</th>
                                            <th className='bg-head'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {cards.map((card, index) => (
                                        <tr key={index}>
                                            <td>{card.firstName}</td>
                                            <td>{card.lastName}</td>
                                            <td>{card.contact}</td>
                                            <td>{card.Address}</td>
                                            <td>{`${card.cardNo.slice(0, 4)} **** **** ****`}</td>
                                            <td>{card.expiryDate}</td>
                                            <td>{card.cvvCode}</td>
                                            <td>
                                                <button
                                                    className="btn btnsubmit"
                                                    onClick={() => handlePayAgain(card.id)}
                                                >
                                                    Pay Again
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                </table>
                                </div>
                            </div>
                       </div>
                </div>
            </div>    
        </>
    );
};

export default Payment;

