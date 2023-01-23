import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import axios from "axios";

const currentEmp = {};
const EmployeesPage = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchAllEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:4000/employees");
        setEmployeeList(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllEmployees();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const modalSaveChanges = () => {
    setModalIsOpen(false);
  };
  console.log("to delete!");
  return (
    <div>
      {employeeList.map((emp) => {
        return (
          <div key={emp.id}>
            <button onClick={openModal}>
              <h1>{"Name: " + emp.fullname + ", ID: " + emp.id}</h1>
            </button>
            {modalIsOpen && <Modal closeModal={closeModal} modalSaveChanges={modalSaveChanges} emp={emp} />}
          </div>
        );
      })}
    </div>
  );
};

export default EmployeesPage;
