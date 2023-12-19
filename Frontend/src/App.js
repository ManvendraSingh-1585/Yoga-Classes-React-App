import React from 'react';
import './App.css';
import Home from './App/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './App/Login';
import Signup from './App/Signup';
import PaymentPage from './App/payment';
import Main_Dashboard from './App/Main_Dashboard';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path='/login/Main_Dashboard' element={<Main_Dashboard />}/>
          <Route exact path="/login/payment" element={<PaymentPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
