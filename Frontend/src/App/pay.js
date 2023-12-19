import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Pay.css';
import {useNavigate, Link} from 'react-router-dom'
const baseurl = "https://gym-backend-0ozl.onrender.com"

const PaymentPage = () => {
  const navigate=useNavigate()
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [userMail, setUserMail] = useState('');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('2022');
  const [user_batch_time, setBatchTime] = useState('');
  const [cvv, setCvv] = useState('');
  const storedUser = localStorage.getItem('user');
  const user = JSON.parse(storedUser);

  useEffect(() => {
    const storedUserId = user.user_id;
    const storedUsername = user.user_name;
    const storedUserMail = user.user_email;

    setUserId(storedUserId);
    setUsername(storedUsername);
    setUserMail(storedUserMail);
  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    // Prepare data to be sent to the server

    try {
      // Make a request to the /updateBatchTime endpoint using Axios
      const response = await axios.put(baseurl+'/updateBatchTime', {user_id:user.user_id, user_batch_time:user.user_batch_time});

      // Handle the response as needed
      console.log(response.data);
      navigate("/login/Main_Dashboard")

      // Redirect to the dashboard or perform other actions based on the response
    } catch (error) {
      console.error('Error updating batch time:', error);
    }
  };

  return (
    <div className="container center">
      <section className="spread">
        <h3>PAYMENT</h3>
        <form onSubmit={handleSubmit}>
        Full name
        <input type="text" name="name" value={username} disabled />
        Email
        <input type="text" name="email" value={userMail} placeholder="Enter email" disabled />
        Accepted Card <br />
        Credit card number
        <input
          type="text"
          name="creditCardNumber"
          pattern="[0-9\s]{13,19}"
          autoComplete="cc-number"
          maxLength="19"
          placeholder="xxxx xxxx xxxx xxxx"
          required
          value={creditCardNumber}
          onChange={(e) => setCreditCardNumber(e.target.value)}
        />

        Exp month
        <input
          type="text"
          name="expMonth"
          placeholder="Enter Month"
          required
          value={expMonth}
          onChange={(e) => setExpMonth(e.target.value)}
        />

        <div id="zip">
          <label>
            Exp year
            <select value={expYear} onChange={(e) => setExpYear(e.target.value)}>
              <option>Choose Year..</option>
              <option>2022</option>
              <option>2023</option>
              <option>2024</option>
              <option>2025</option>
            </select>
          </label>
          <label>
            CVV
            <input
              type="number"
              name="cvv"
              placeholder="CVV"
              size="3"
              required
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </label>
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
        </div>
        <input type="submit" value="Sign up" className="pill"  />
      </form>
      </section>
    </div>
  );
};

export default PaymentPage;
