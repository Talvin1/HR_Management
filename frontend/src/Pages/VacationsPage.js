import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import './EmployeesPage.css'

const VacationsPage = (props) => {
  const [currentEmp, setCurrentEmp] = useState({});
  const [vacList, setVacList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const IdFromUrl = useLocation().pathname.split("/");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get("http://localhost:4000/employees/" + IdFromUrl[2]);
        setCurrentEmp(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchAllVacs = async () => {
        try {
          const res = await axios.get("http://localhost:4000/vacPage/" + IdFromUrl[2]);
          setVacList(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchEmployee();
    fetchAllVacs();
  }, []);

  const openModal = (e) => {
    setModalIsOpen(true);
  };



  // <Link to={"/editVac/"+ props.emp.id}> Go to vacations data on employee</Link>


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
    props.loggedIn &&
    <div>
          <div >
            <button onClick={openModal}>
              <h1>{"Name: " + currentEmp.fullname + ", ID: " + currentEmp.id}</h1>
            </button>
          </div>
      {modalIsOpen && <Modal closeModal={closeModal} emp={currentEmp} type={"vac"}/>}
    </div>
  );
};

export default VacationsPage;