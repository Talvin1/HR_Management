import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  

  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });


  const checkCredentials = async (e) => {
    try{
      e.preventDefault();
      const verifed = (await axios.post("http://localhost:4000/login", {username:inputValues.username , password: inputValues.password})).data;
      props.setLoggedIn(verifed);
      if(verifed === true) {
        navigate("/employees")
      }else {
        alert("Wrong Credentials")
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
    <div>
      <h1>'Alpha Robotics' Human Resources System</h1>
      <h2>Please Enter Your Credentials To Access The System</h2>
      <form onSubmit={checkCredentials}>
        <input placeholder="Username" name="username" onChange={handleChange} value={inputValues.username} />
        <input placeholder="Password" name="password" onChange={handleChange} value={inputValues.password} />
        <button type="submit" >Sign In</button>
      </form>
    </div>
  );
};

export default Login;
