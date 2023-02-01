import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import "./Edit.css";
import { Link } from "react-router-dom";

const Edit = () => {
  const authenticated = window.localStorage.getItem("authenticated") === "true";
  const [employee, setEmployee] = useState({});
  const currentDate = new Date();
  currentDate.getDate();
  const date = new Date();
  const IdFromUrl = useLocation().pathname.split("/");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get("http://localhost:4000/employees/" + IdFromUrl[2]);
        setEmployee(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployee();
  }, []);

  const onlyLettersAndSpaces = (str) => {
    return /^[A-Za-z\s]*$/.test(str);
  };

  const isANumber = (str) => {
    return !/\D/.test(str);
  };

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee((prevEmployee) => ({ ...prevEmployee, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const date21YearsAgo = new Date(date.setFullYear(date.getFullYear() - 21));
    // const empDateFormat = new Date(employee.birthdate);
    // let approved = true;
    // if (empDateFormat > date21YearsAgo) {
    //   alert("Employee doesn't meet the age requirement");
    //   approved = false;
    // }
    // if (e.target.name === "fullname" && !employee.fullname.includes(" ")) {
    //   alert("Please add the last name of the employee");
    //   approved = false;
    // }
    // if (!onlyLettersAndSpaces(employee.fullname)) {
    //   alert("An employee's name can only include letters of the alphabet");
    //   approved = false;
    // }
    // if (!isANumber(employee.id)) {
    //   alert("An employee's id can only include digits");
    //   approved = false;
    // }
    // if (employee.employmentDate < "2015-01-01") {
    //   alert("The company was established on the 01-01-2015, therefore, an employee can't be employed before that date");
    //   approved = false;
    // }
    // if (employee.employmentDate > currentDate) {
    //   alert("Employment date cannot be in the future");
    //   approved = false;
    // }
    // if (employee.phoneNumber < "0500000000" || employee.phoneNumber > "0599999999") {
    //   alert("Please enter a valid phone number");
    //   approved = false;
    // }
    try {
      await axios.put("http://localhost:4000/employees/" + IdFromUrl[2], employee);
      navigate("/employees");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    authenticated && (
      <div>
        <div className="logoContainer">
          <Link to="/employees">
            <img src="/images/alpha-robotics-logo.png" alt="logo" />
          </Link>
        </div>
        <h1>Choose a field to edit</h1>
        <form>
          <p>Enter employee's full name</p>
          <input
            type="text"
            maxLength="30"
            name="fullname"
            placeholder="Fullname"
            onChange={handleChange}
            value={employee.fullname}
          />
          <p>Enter employee's birthdate</p>
          <input
            type="date"
            name="birthdate"
            placeholder="Birthdate"
            onChange={handleChange}
            min="01-01-1960"
            max={currentDate}
            value={employee.birthdate}
          />
          <p>Enter employee's employment date</p>
          <input
            type="date"
            name="employmentDate"
            placeholder="Employment date"
            onChange={handleChange}
            min="01-01-2015"
            max={currentDate}
            value={employee.employmentDate}
          />
          <p>Enter employee's address</p>
          <input type="text" name="address" placeholder="Address" onChange={handleChange} value={employee.address} />
          <p>Enter employee's phone number</p>
          <input
            type="text"
            name="phoneNumber"
            maxLength="10"
            placeholder="Phone Number"
            onChange={handleChange}
            min="0500000000"
            max="0599999999"
            value={employee.phoneNumber}
          />
          {/* <p>Enter employee's picture</p> */}
          {/* <input
            type="file"
            name="empPic"
            className="fileInput"
            placeholder="Picture"
            onChange={handleChange}
            accept="image/*"
          /> */}
          <br />
          <button onClick={handleSubmit}>Save Changes To Employee</button>
        </form>
      </div>
    )
  );
};

export default Edit;
