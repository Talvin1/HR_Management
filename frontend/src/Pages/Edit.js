import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";

const Edit = () => {
  const [employee, setEmployee] = useState({});
  const currentDate = new Date();
  currentDate.getDate();
  const IdFromUrl = useLocation().pathname.split("/");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee((prevEmployee) => ({ ...prevEmployee, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:4000/employees/" + IdFromUrl[2], employee);
      navigate("/employees");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>Choose a field to edit</h1>
      <form>
        <p>Enter employee's full name</p>
        <input type="text" maxLength="45" name="fullname" placeholder="Fullname" onChange={handleChange} />
        <p>Enter employee's birthdate</p>
        <input
          type="date"
          name="birthdate"
          placeholder="Birthdate"
          onChange={handleChange}
          min="01-01-1960"
          max={currentDate}
        />
        <p>Enter employee's employment date</p>
        <input
          type="date"
          name="employmentDate"
          placeholder="Employment date"
          onChange={handleChange}
          min="01-01-2015"
          max={currentDate}
        />
        <p>Enter employee's address</p>
        <input type="text" name="address" placeholder="Address" onChange={handleChange} />
        <p>Enter employee's phone number</p>
        <input
          type="text"
          name="phoneNumber"
          maxLength="10"
          placeholder="Phone Number"
          onChange={handleChange}
          min="0500000000"
          max="0599999999"
        />
        <p>Enter employee's picture</p>
        <input type="text" name="empPic" placeholder="Picture" onChange={handleChange} />
        <button onClick={handleSubmit}>Save Changes To Employee</button>
      </form>
    </div>
  );
};

export default Edit;
