import logo from './logo.svg';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Payment from './components/Payment';

function App() {
  return (
   <>
      <Router>
        <Routes>
          {/* Define routes */}
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Payment />} />
        </Routes>
      </Router>
   </>
  );
}

export default App;
