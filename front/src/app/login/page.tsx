'use client'
import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const apiUrl = "http://localhost:8000/auth";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post(apiUrl, {
        email,
        password,
      });
      const data = response.data;
      if (response.status === 200) {
        console.log("Login successful:", data);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error :any) {
      console.error("Error during login:", error.message);
      setError("Internal Server Error");
    }
  };

  return (
    <div>
      <h1>Login</h1>
        <input
        placeholder="email"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
        placeholder="password"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="button" onClick={handleLogin}>
          Login
        </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
