import React, { useState, useEffect } from "react";

const Login = () => {
  // const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
  });

  const [admins, setAdmins] = useState([{ username: "tal", password: "vin" }]);

  const checkCredentials = (e) => {
    e.preventDefault();
    const inputUsername = inputValues.username;
    const inputPassword = inputValues.password;
    admins.forEach((admin) => {
      if (admin.username === inputUsername && admin.password === inputPassword) {
        // return navigate("/main");
        console.log("success");
      } else {
        console.log("Wrong Input");
      }
    });
  };

  const handleChange = (e) => {
    setInputValues(() => {
      return { ...inputValues, [e.target.name]: e.target.value };
    });
  };
  console.log(inputValues);
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
