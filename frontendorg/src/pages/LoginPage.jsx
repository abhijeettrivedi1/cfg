import axios from 'axios';
import { Navigate, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from "react"
import { Usercontext } from '../usercontext';
import '../css/LoginPage.css'; // Import CSS file for styling

const LoginPage = () => {
  const [teacherId, setTeacherId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { setUser, user } = useContext(Usercontext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/loginTeacher', {
        teacherId,
        password,
      });
      setUser(response.data);
      setMessage("Success");
    } catch (error) {
      setMessage('Error: Unable to login');
    }
  };

  useEffect(() => {
    if (user) {
      console.log('User state updated:', user);
    }
  }, [user]);

  if (user) {
    return (
      <Navigate to="/" />
    );
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>
      {message && <p className="message">{message}</p>}
      <div className="register-link">
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
