import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./AddPage.css";
import { Link } from "react-router-dom";

const AddPage = () => {
  const authenticated = window.localStorage.getItem("authenticated") === "true";
  const [newEmployee, setNewEmployee] = useState({
    id: 0,
    fullname: "",
    birthdate: "",
    employmentDate: "",
    remainingVacDays: 20,
    address: "",
    phoneNumber: 0,
    empPic: "",
  });

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const currentDate = `${day}-${month}-${year}`;

  const navigate = useNavigate();

  const onlyLettersAndSpaces = (str) => {
    return /^[A-Za-z\s]*$/.test(str);
  };

  const isANumber = (str) => {
    return !/\D/.test(str);
  };

  const handleChange = (e) => {
    setNewEmployee((prevEmployee) => ({ ...prevEmployee, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date21YearsAgo = new Date(date.setFullYear(date.getFullYear() - 21));
    const empDateFormat = new Date(newEmployee.birthdate);
    let approved = true;
    if (empDateFormat > date21YearsAgo) {
      alert("Employee doesn't meet the age requirement, 21 years old");
      approved = false;
    }
    if (newEmployee.id.length < 9) {
      alert("Employee id is not a valid number");
      approved = false;
    }
    if (!newEmployee.fullname.includes(" ")) {
      alert("Please add the last name of the employee");
      approved = false;
    }
    if (!onlyLettersAndSpaces(newEmployee.fullname)) {
      alert("An employee's name can only include letters of the alphabet");
      approved = false;
    }
    if (!isANumber(newEmployee.id)) {
      alert("An employee's id can only include digits");
      approved = false;
    }
    if (newEmployee.employmentDate < "2015-01-01") {
      alert("The company was established on the 01-01-2015, therefore, an employee can't be employed before that date");
      approved = false;
    }
    if (newEmployee.employmentDate > currentDate) {
      alert("Employment date cannot be in the future");
      approved = false;
    }
    if (
      newEmployee.phoneNumber < "0500000000" ||
      newEmployee.phoneNumber > "0599999999" ||
      !isANumber(newEmployee.phoneNumber)
    ) {
      alert("Please enter a valid phone number");
      approved = false;
    }
    if (approved) {
      try {
        await axios.post("http://localhost:4000/employees", newEmployee);
        navigate("/employees");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    authenticated && (
      <div className="addContainer">
        <div className="logoContainer">
          <Link to="/employees">
            <img src="/images/alpha-robotics-logo.png" alt="logo" />
          </Link>
        </div>
        <h1>Add A New Employee</h1>
        <form>
          <p>Enter employee's ID</p>
          <input type="text" name="id" placeholder="ID" maxLength="9" onChange={handleChange} />
          <p>Enter employee's full name</p>
          <input type="text" maxLength="30" name="fullname" placeholder="Fullname" onChange={handleChange} />
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
          {/* <p>Enter employee's picture</p>
          <input type="file" name="empPic" placeholder="Picture" onChange={handleChange} accept="image/*" /> */}
          <button onClick={handleSubmit}>Add Employee</button>
        </form>
      </div>
    )
  );
};

export default AddPage;
