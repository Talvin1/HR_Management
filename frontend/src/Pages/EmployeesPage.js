import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import axios from "axios";
import { Link } from "react-router-dom";
import "./EmployeesPage.css";
import "./Login.css";

const EmployeesPage = () => {
  const authenticated = window.localStorage.getItem("authenticated") === "true";
  const [currentEmp, setCurrentEmp] = useState({});
  const [employeeList, setEmployeeList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:4000/employees");
        setEmployeeList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllEmployees();
  }, []);

  const openModal = (e) => {
    setCurrentEmp(employeeList[e.target.id - 1]);
    setModalIsOpen(true);
    const containerDiv = document.querySelector(".employees");
    containerDiv.style.opacity = 0.2;
  };

  const closeModal = () => {
    setModalIsOpen(false);
    const containerDiv = document.querySelector(".employees");
    containerDiv.style.opacity = 100;
    setCurrentEmp({});
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:4000/employees/" + id);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    authenticated && (
      <div className="pageContainer">
        <div className="logoContainer">
          <img src="/images/alpha-robotics-logo.png" alt="logo" />
        </div>
        <h1>Company Employees:</h1>
        <div className="container">
          <div className="employees">
            {employeeList.map((emp, index) => {
              return (
                <div className="emp" key={index + 1}>
                  <button onClick={openModal} id={index + 1}>
                    <p id={index + 1}>{"Name: " + emp.fullname}</p> <br></br>
                    <p id={index + 1}>{" ID: " + emp.id}</p>
                  </button>
                </div>
              );
            })}
          </div>
          {modalIsOpen && (
            <Modal
              className="modal"
              closeModal={closeModal}
              emp={currentEmp}
              handleDelete={handleDelete}
              type={"info"}
            />
          )}
          <button className="addBtn">
            <Link to="/addPage"> Add new employee</Link>
          </button>
        </div>
      </div>
    )
  );
};

export default EmployeesPage;
