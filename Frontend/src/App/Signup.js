import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Axios from 'axios';
import logo from './../images/logo.png';

const baseurl = "https://gym-backend-0ozl.onrender.com"

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [batchTime, setBatchTime] = useState(''); // Added batch time state
  const [startDate, setStartDate] = useState('');
  const [password, setPassword] = useState('');

  const signup = (e) => {
    e.preventDefault();

    // Check if age is within the specified range
    if (age < 18 || age > 65) {
      alert('Age must be between 18 and 65. Please enter a valid age.');
      return;
    }

    Axios.post(baseurl + '/signup', {
      name: name,
      email: email,
      age: age,
      gender: gender,
      phone: phone,
      batch_time: batchTime, // Added batch time in the request
      start_date: startDate,
      password: password,
    }).then((response) => {
      if (response.data.status) {
        try {
          localStorage.setItem('user', JSON.stringify(response.data.user));
          sessionStorage.setItem('isLoggedIn', 'true');
          navigate('/login/payment');
        } catch (error) {
          console.error('Error storing user data in local storage:', error);
        }
      } else {
        alert('Insufficient Entry! Please try again');
      }
    });
  };

  return (
    <div id="container">
      <nav id="navbar">
        <Link to="/">
          <img src={logo} alt="logo" title="DecentRIDE | Cool with CarPool" />
        </Link>
        <input type="checkbox" id="burger-toggle" />
        <label id="burger" htmlFor="burger-toggle">
          <div></div>
        </label>
        <ul>
          <li>
            <Link to="/" className="shortcut">
              Home
            </Link>
          </li>
          <li>
            <Link to="/login" className="shortcut">
              Log In
            </Link>
          </li>
        </ul>
      </nav>
      <section className="spread" >
        <h2>Sign Up</h2>
        <form>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age (18-65)"
            onChange={(e) => {
              setAge(e.target.value);
            }}
            min="18"
            max="65"
            required
          />
          <input
            type="text"
            name="gender"
            placeholder="Gender"
            onChange={(e) => {
              setGender(e.target.value);
            }}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            required
          />
          <label>
            Batch Time:
            <select
              name="batchTime"
              onChange={(e) => {
                setBatchTime(e.target.value);
              }}
              required
            >
              <option value="" disabled selected>
                Select Batch Time
              </option>
              <option value="6-7AM">6-7AM</option>
              <option value="7-8AM">7-8AM</option>
              <option value="8-9AM">8-9AM</option>
              <option value="5-6PM">5-6PM</option>
            </select>
          </label>
          <input
            type="date"
            name="start_date"
            placeholder="Start Date"
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <input type="submit" value="Sign up" className="pill" onClick={signup} />
        </form>
        <p className="spread">
          Already registered, <Link to="/login" className="shortcut">LogIn</Link> here!
        </p>
      </section>
    </div>
  );
}
