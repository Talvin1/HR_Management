import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import axios from "axios";
import { Link } from "react-router-dom";

const EmployeesPage = () => {
  const [currentEmp, setCurrentEmp] = useState({});
  const [employeeList, setEmployeeList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:4000/employees");
        setEmployeeList(res.data);
        console.log("Fetched Data!");
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllEmployees();
  }, []);

  const openModal = (e) => {
    console.log(e.target);
    setCurrentEmp(employeeList[e.target.id - 1]);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
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
    <div>
      {employeeList.map((emp, index) => {
        return (
          <div key={index + 1}>
            <button onClick={openModal} id={index + 1}>
              <h1 id={index + 1}>{"Name: " + emp.fullname + ", ID: " + emp.id}</h1>
            </button>
          </div>
        );
      })}
      {modalIsOpen && <Modal closeModal={closeModal} emp={currentEmp} handleDelete={handleDelete} />}
      <button>
        <Link to="/addPage"> Add new employee</Link>
      </button>
    </div>
  );
};

export default EmployeesPage;
