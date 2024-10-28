import React, { useState } from 'react';
import './LoginForm.js.css';
import axios from 'axios';

function LoginForm({ onRegister, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isRegistering ? 'http://localhost:8000/api/register' : 'http://localhost:8000/api/login';
    const payload = { email, password };

    try {
      const response = await axios.post(url, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        if (isRegistering) {
          onRegister(email, password);
          await axios.post('http://localhost:8000/api/sendRegistrationEmail', { email });
        } else {
          onLogin(email, password);
          // Redirect to dashboard or perform any additional actions
        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  const toggleFormMode = () => setIsRegistering(!isRegistering);

  return (
    <div className="login-form">
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>
      <button onClick={toggleFormMode}>
        {isRegistering ? 'Already have an account? Login' : 'Create an account'}
      </button>
    </div>
  );
}

export default LoginForm;
