import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from './../images/logo.png';
const baseurl = "https://gym-backend-0ozl.onrender.com"
export default function Main_Dashboard() {
  const storedUser = localStorage.getItem('user');
  const user = JSON.parse(storedUser);
  const user_id = user.user_id;
  return (
    <div className="container">
      <nav id="navbar">
        <Link to='/'>
          <img src={logo} alt="logo" />
        </Link>
        <label htmlFor="burger-toggle">
          <div></div>
        </label>
        <ul>
          <li>
            <Link to="/" className="shortcut">Home</Link>
          </li>
          <li>
            <a href='#description-two' className="shortcut">About</a>
          </li>
        </ul>
      </nav>
      <section >
        <main>
        <p style={{ color: 'black', fontWeight: 'bold' }}>{user ? `Welcome, ${user.user_name}!` : 'Loading user details...'}</p>
        <p style={{ color: 'black', fontWeight: 'bold' }}>Email: {user.user_email}</p>
        <p style={{ color: 'black', fontWeight: 'bold' }}>Age: {user.user_age}</p>
        <p style={{ color: 'black', fontWeight: 'bold' }}>Phone: {user.user_phone}</p>
        <p style={{ color: 'black', fontWeight: 'bold' }}>Batch Time: {user.user_batch_time}</p>
        <p style={{ color: 'black', fontWeight: 'bold' }}>Start Date: {user.user_start_date}</p>
        
        </main>
      </section>

    </div>
  );
}
