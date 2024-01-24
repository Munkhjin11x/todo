'use client'
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const apiUrl = "http://localhost:8000/auth";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
        console.log('Sending login request with:', { username, password });
      const response = await axios.post(apiUrl, {
        username,
        password,
      });
      const data = response.data.user  
      if (data && (data.id || data.username)) {
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
    <div style={{ backgroundImage: `url(https://i.pinimg.com/474x/5d/0f/92/5d0f92c6b846a0631cdcd24614c7cf0d.jpg)`}} className=" relative ">
      <div className=" relative w-1/2 h-[1400px]">
      </div>
      <div className=" bg-white rounded-3xl h-[1000px] w-[720px] fixed right-1/2 top-3" >
        <img className="fixed  w-[720px] h-[1000px]  p-5 rounded-3xl" src="https://i.pinimg.com/736x/5c/fa/f8/5cfaf8bb9b2a7922a77b83f17cc5c39c.jpg"/>
        <p className="absolute top-[400px] font-black text-white text-[40px] left-[250px] ">Welcome back</p>
      </div>
      <div className=" bg-white z-20 h-[1000px]  rounded-3xl w-[720px] fixed left-1/2 top-3">
      <div className="  flex flex-col  absolute top-96 left-[250px]">
      <h1 className="text-center font-semibold text-[24px]">Login</h1>
      <div className="flex gap-2  mt-3 flex-col">
        <p>Email</p>
        <input
        placeholder="email"
        className="border-solid border-[1px] rounded-md  h-[40px]"
          type="email"
          id="email"
          name="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <p>Password</p>
        <input
        className="border-solid border-[1px] rounded-md w-[250px] h-[40px]"
        placeholder="password"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      </div>
    </div>
  );
};

export default Login;
