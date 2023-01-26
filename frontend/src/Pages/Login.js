import React, { useState, useEffect } from "react";
import axios from "axios";
// import { useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  // const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAllAdmins = async () => {
      try {
        const res = await axios.get("http://localhost:4000/");
        setAdmins(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAdmins();
  }, []);

  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });

  const checkCredentials = (e) => {
    e.preventDefault();
    const inputUsername = inputValues.username;
    const inputPassword = inputValues.password;
    admins.map((admin) => {
      if (admin.username === inputUsername && admin.password === inputPassword) {
        console.log("successfull if");
        return true;
      }
      return false;
    });
  };

  const handleChange = (e) => {
    setInputValues(() => {
      return { ...inputValues, [e.target.name]: e.target.value };
    });
  };
  return (
    <div>
      <h1>'Alpha Robotics' Human Resources System</h1>
      <h2>Please Enter Your Credentials To Access The System</h2>
      <form onSubmit={checkCredentials}>
        <input placeholder="Username" name="username" onChange={handleChange} value={inputValues.username} />
        <input placeholder="Password" name="password" onChange={handleChange} value={inputValues.password} />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;
