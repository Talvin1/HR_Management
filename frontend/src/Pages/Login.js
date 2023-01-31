import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import companyLogo from "/frontend/public/images";

const Login = () => {
  const navigate = useNavigate();
  let verifed = false;
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });

  const checkCredentials = async (e) => {
    try {
      e.preventDefault();
      verifed = (
        await axios.post("http://localhost:4000/login", {
          username: inputValues.username.replace(/\s/g, ""),
          password: inputValues.password.replace(/\s/g, ""),
        })
      ).data;
      if (verifed) {
        window.localStorage.setItem("authenticated", "true");
        navigate("/employees");
      } else {
        window.localStorage.setItem("authenticated", "false");
        alert("Wrong Credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setInputValues(() => {
      return { ...inputValues, [e.target.name]: e.target.value };
    });
  };
  return (
    <div className="loginContainer">
      <div className="title">
        <h1>'Alpha Robotics' Human Resources System</h1>
      </div>
      <h2>Please Enter Your Credentials To Access The System</h2>
      <form onSubmit={checkCredentials}>
        <input
          className="input"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          value={inputValues.username}
        />
        <input
          className="input"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={inputValues.password}
        />
        <br />
        <button className="button" type="submit">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
