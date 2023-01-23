import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import axios from "axios";

const EmployeesPage = () => {
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
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentEmp({});
  };

  const handleDelete = async (id) => {
    try {
      console.log("in handle");
      await axios.delete("http://localhost:4000/employees/" + id);
      console.log("after axios");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {employeeList.map((emp) => {
        return (
          <div key={emp.id}>
            <button onClick={openModal} id={emp.id}>
              <h1 id={emp.id}>{"Name: " + emp.fullname + ", ID: " + emp.id}</h1>
            </button>
          </div>
        );
      })}
      {modalIsOpen && <Modal closeModal={closeModal} emp={currentEmp} handleDelete={handleDelete} />}
    </div>
  );
};

export default EmployeesPage;
