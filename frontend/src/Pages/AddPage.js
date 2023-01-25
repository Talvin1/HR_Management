import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const AddPage = () => {
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

  const currentDate = new Date();
  currentDate.getDate();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewEmployee((prevEmployee) => ({ ...prevEmployee, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/employees", newEmployee);
      navigate("/employees");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Add A New Employee</h1>
      <form>
        <p>Enter employee's ID</p>
        <input type="number" name="id" placeholder="ID" onChange={handleChange} min="00000001" max="999999999" />
        <p>Enter employee's full name</p>
        <input type="text" name="fullname" placeholder="Fullname" onChange={handleChange} />
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
          placeholder="Phone Number"
          onChange={handleChange}
          min="0500000000"
          max="0599999999"
        />
        <p>Enter employee's picture</p>
        <input type="text" name="empPic" placeholder="Picture" onChange={handleChange} />
        <button onClick={handleSubmit}>Add Employee</button>
      </form>
    </div>
  );
};

export default AddPage;
