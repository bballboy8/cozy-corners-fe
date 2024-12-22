import './App.css';
import React, { useEffect, useState } from 'react';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Payment from './components/Payment';
import { loadStripe } from '@stripe/stripe-js'; // Import loadStripe
import { Elements } from '@stripe/react-stripe-js'; // Import Elements
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector from Redux
import { setToken } from './actions/LoginActions'; // Import setToken action
import { LoadStyleSheet } from './utils/LoadStyleSheet';

// Load Stripe with your publishable key and handle errors
const stripePromise = loadStripe(`${process.env.REACT_APP_ACCESS_KEY}`).catch((error) => {
  console.error('Error loading Stripe:', error);
  return null; // Return null if Stripe fails to load
});

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);
  const [loading, setLoading] = useState(true); // Track loading state
  const [stripeError, setStripeError] = useState(null); // Track Stripe loading error

  useEffect(() => {
    // Load the CSS file dynamically
    LoadStyleSheet('./App.css', () => {
      setLoading(false); // Set loading to false once the CSS is loaded
    });

    // Check if token exists in localStorage and set it in Redux
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      dispatch(setToken(storedToken)); // Store token in Redux
    }
  }, [dispatch]);

  useEffect(() => {
    // Ensure that token is stored in localStorage whenever it changes in Redux
    if (token) {
      localStorage.setItem('token', token); // Store token in localStorage
    }
  }, [token]);

  // If still loading, show a loading screen or spinner
  if (loading) {
    return <div>Loading...</div>; // Replace with an actual loading spinner or UI
  }

  // If Stripe failed to load, show an error message
  if (stripeError) {
    return <div>Failed to load Stripe. Please try again later.</div>;
  }

  return (
    <Router>
      <Elements stripe={stripePromise}>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={token ? <Payment /> : <Navigate to="/login" />} 
          />
        </Routes>
      </Elements>
    </Router>
  );
}

export default App;
