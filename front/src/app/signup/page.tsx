'use client'
import React, { useState } from 'react';
import axios from 'axios';

interface SignupProps {
  createUser: (username: string, password: string) => Promise<void>;
}

const Signup: React.FC<SignupProps> = ({ createUser }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
  
      const response = await axios.post('http://localhost:8000/users', { username, password });
      if (response.status === 201) {
        setUsername('');
        setPassword('');
        setError(null);
      } else {

        setError('Failed to create user. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setError('Internal Server Error. Please try again later.');
    }
  };

  return (
    <div>
      <h1>User Signup</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
