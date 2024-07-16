import React from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom'; // Import Link from react-router-dom
import '../css/RegisterPage.css'; // Import CSS file for styling
import { useContext, useEffect, useState } from "react"
import { Usercontext } from '../usercontext';

const RegisterPage = () => {
  const [teacherId, setTeacherId] = useState('');
  const [subject, setSubject] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { setUser, user } = useContext(Usercontext);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/registerTeacher', {
        teacherId,
        subject,
        password,
      });
      setMessage(response.data.message);
      setUser(teacherId);
    } catch (error) {
      setMessage('Error: Unable to register');
    }
  };
  if (user) {
    return (
      <Navigate to="/" />
    );
  }

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="teacherId">Teacher ID</label>
          <input
            type="text"
            id="teacherId"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="register-btn">Register</button>
      </form>
      {message && <p className="message">{message}</p>}
      <div className="login-link">
        <p>Already registered? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default RegisterPage;
