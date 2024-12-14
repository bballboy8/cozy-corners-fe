import React, { useState } from 'react';

const Payment = () => {
       // Define state for error messages
       const [errors, setErrors] = useState({
          
           nameOnCard: '',
           cardNumber: '',
           expirationDate: '',
           cvv: '',
           amount: '',
       });
   
       
       // Handle form submission
       const handleSubmit = (e) => {
           e.preventDefault(); // Prevent default form submission
   
           // Validate all fields
           let formIsValid = true;
           let errorMessages = {};
             
   
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
               errorMessages.expirationDate = 'date is required';
           } else if (!expirationDateRegex.test(expirationDate)) {
               formIsValid = false;
               errorMessages.expirationDate = 'date must be in MM/YYYY';
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
   
            if (!e.target.amount.value) {
               formIsValid = false;
               errorMessages.amount = 'amount is required';
           }

           setErrors(errorMessages);
   
           // If the form is valid, we can submit it
           if (formIsValid) {
               console.log('Form submitted');
               // Submit form logic here, e.g., call an API
           }
       };
   
       return (
           <>
               <div className="container-fluid">
                   <div className="row no-gutters mt-5">
                       <div className="col-md-6 right-side fix-height d-flex justify-content-end align-items-center">
                           <div className="login-form dashboard mt-5">
                               <h2>Enter Card Details</h2>
                               <form onSubmit={handleSubmit}>
                                   <div className="container">
                                       <div className="row">
                                           <div className="col-md-12 mb-2">
                                               <label className="mb-2">Enter Name</label>
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
                                                   maxLength="7" 
                                                   required
                                               />
                                               {errors.expirationDate && (
                                                   <small className="text-danger">{errors.expirationDate}</small>
                                               )}
                                           </div>
   
                                           <div className="col-md-6 mb-2">
                                               <label className="mb-2">CVV</label>
                                               <input
                                                   type="text"
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
                                               <label className="mb-2">Enter Amount</label>
                                               <input
                                                   type="number"
                                                   placeholder="Enter Amount"
                                                   className="form-control"
                                                   name="amount"
                                                   required
                                               />
                                               {errors.cvv && (
                                                   <small className="text-danger">{errors.amount}</small>
                                               )}
                                           </div>
                                           <div className="col-md-12">
                                               <button type="submit" className="btn btnsubmit w-100 mt-2">
                                                   Pay Now
                                               </button>
                                           </div>
                                       </div>
                                   </div>
                               </form>
                           </div>
                       </div>
                       <div className="col-md-6 left-side fix-height d-flex justify-content-start align-items-center">
                           <img
                               src="/img/ozy.png" // Replace with your image URL
                               alt="Background"
                               className="img-fluid"
                           />
                       </div>
                       <div className='col-md-12 ms-5 ctm-width'>
                            <h3>Card Details</h3>
                            <div className='bdrRadius'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th className='bg-head'>Name</th>
                                            <th className='bg-head'>Card Number</th>
                                            <th className='bg-head'>Expiry Date</th>
                                            <th className='bg-head'>CVV code</th>
                                            <th className='bg-head'>Action</th>
                                        </tr>
                                    </thead>
                                        <tbody>
                                        <tr>
                                            <td>Sam</td>
                                            <td>4567 XXXXX XXXX</td>
                                            <td>12/25</td>
                                            <td>123</td>
                                            <td><input type="button" className='btn btnsubmit' value="Pay Again"/></td>
                                        </tr>
                                        <tr>
                                            <td>Sam</td>
                                            <td>4567 XXXXX XXXX</td>
                                            <td>12/25</td>
                                            <td>123</td>
                                            <td><input type="button" className='btn btnsubmit' value="Pay Again"/></td>
                                        </tr>
                                        <tr>
                                            <td>Sam</td>
                                            <td>4567 XXXXX XXXX</td>
                                            <td>12/25</td>
                                            <td>123</td>
                                            <td><input type="button" className='btn btnsubmit' value="Pay Again"/></td>
                                        </tr>
                                        </tbody>
                                </table>
                            </div>
                       </div>
                   </div>
               </div>
        </>
    );
};

export default Payment;

