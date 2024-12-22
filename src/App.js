import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Payment from './components/Payment';
import { loadStripe } from '@stripe/stripe-js'; // Import loadStripe
import { Elements } from '@stripe/react-stripe-js'; // Import Elements

// Load Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51PzRqlL3RddndhKEPHI7rHjRmlo2PIWHlSIuuWTB6bvxdE7PjxCS7BPeBao8NNyt7nzEPddqa2zaLQY5BwwZYhu300bQsYc1Ec');

function App() {
  return (
    <>
      <Router>
        {/* Wrap the Routes in the Elements provider */}
        <Elements stripe={stripePromise}>
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Payment />} />
          </Routes>
        </Elements>
      </Router>
    </>
  );
}

export default App;
