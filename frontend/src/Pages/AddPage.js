import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const AddPage = (props) => {
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

  const handleChange = (e) => {
    if(e.target.name === 'id' && e.target.value.length > 8) {

    } else {
      console.log(e.target.value)
      setNewEmployee((prevEmployee) => ({ ...prevEmployee, [e.target.name]: e.target.value }));
    }
  };

  const handleChangeDate = (e) => {
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
    props.loggedIn &&
    <div>
      <h1>Add A New Employee</h1>
      <form>
        <p>Enter employee's ID</p>
        <input type="text" name="id" placeholder="ID" maxLength="9" onChange={handleChange} min="00000001" max="999999999" />
        <p>Enter employee's full name</p>
        <input type="text" maxLength="45" name="fullname" placeholder="Fullname" onChange={handleChange} />
        <p>Enter employee's birthdate</p>
        <input
          type="date"
          name="birthdate"
          placeholder="Birthdate"
          onChange={handleChangeDate}
          min="01-01-1960"
          max={currentDate}
        />
        <p>Enter employee's employment date</p>
        <input
          type="date"
          name="employmentDate"
          placeholder="Employment date"
          onChange={handleChangeDate}
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
        <button onClick={handleSubmit}>Add Employee</button>
      </form>
    </div>
  );
};

export default AddPage;
