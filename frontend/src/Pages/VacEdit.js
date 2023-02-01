import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import "./VacEdit.css";

const Edit = (props) => {
  const authenticated = window.localStorage.getItem("authenticated") === "true";
  const [addingVac, setAddingVac] = useState(false);
  const [currentEmp, setCurrentEmp] = useState({
    id: 0,
    fullname: "",
    birthdate: "",
    employmentDate: "",
    remainingVacDays: 20,
    address: "",
    phoneNumber: 0,
    empPic: "",
  });
  const [newVac, setNewVac] = useState({
    empId: [props.id],
    startDate: "",
    endDate: "",
    isSick: 0,
  });
  const [vacList, setVacList] = useState([]);

  const navigate = useNavigate();

  let currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  let approved = true;

  const IdFromUrl = useLocation().pathname.split("/");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get("http://localhost:4000/employees/" + IdFromUrl[2]);
        setCurrentEmp(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchAllVacs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/editVac/" + IdFromUrl[2]);
        setVacList(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployee();
    fetchAllVacs();
  }, []);

  const changeVacDays = (vac, action) => {
    const startDateLong = new Date(vac.startDate);
    const endDateLong = new Date(vac.endDate);
    const daysOfVacation = (endDateLong - startDateLong) / (1000 * 3600 * 24);
    let emp;
    if (action === "-") {
      emp = { ...currentEmp, remainingVacDays: currentEmp.remainingVacDays - (daysOfVacation + 1) };
    }
    // else{
    //   emp = {...currentEmp, remainingVacDays: currentEmp.remainingVacDays + daysOfVacation};
    // }
    setCurrentEmp(emp);
    editEmpVacDaysLeft(emp);
  };

  const editEmpVacDaysLeft = async (emp) => {
    try {
      await axios.put("http://localhost:4000/employees/" + IdFromUrl[2], emp);
      navigate("/employees");
    } catch (error) {
      console.log(error);
    }
  };

  const calcDiff = (dateStart, dateEnd) => {
    let diffDays;
    const dateStartFormat = new Date(dateStart);
    const dateEndFormat = new Date(dateEnd);
    const diffYears = dateEndFormat.getFullYear() - dateStartFormat.getFullYear();
    diffDays = parseInt((dateEndFormat - dateStartFormat) / (1000 * 60 * 60 * 24), 10);
    return [diffDays, diffYears];
  };

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete("http://localhost:4000/editVac/" + id);
  //     window.location.reload();
  //     changeVacDays(newVac, '+');
  //   } catch (error) {
  //   }
  // };
  const employeeSickList = vacList.filter((vac) => vac.empId === parseInt(IdFromUrl[2]) && vac.isSick === 1);
  let sickDaysCombined = 0;
  employeeSickList.map((vac) => {
    sickDaysCombined = sickDaysCombined + calcDiff(vac.startDate, vac.endDate)[0];
  });
  const handleChange = (e) => {
    setNewVac((prevVac) => ({ ...prevVac, [e.target.name]: e.target.value }));
  };

  const handleCheckbox = (e) => {
    let isChecked = 0;
    if (e.target.checked) {
      isChecked = 1;
    }
    setNewVac((prevVac) => ({ ...prevVac, [e.target.name]: isChecked }));
  };

  const handleAddDate = async (e) => {
    try {
      await axios.post("http://localhost:4000/editVac/" + IdFromUrl[2], newVac);
      if (newVac.isSick === 0) {
        changeVacDays(newVac, "-");
      }
      navigate("/employees");
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const startDateLong = new Date(newVac.startDate);
    const endDateLong = new Date(newVac.endDate);
    const employeeVacList = vacList.filter((vac) => vac.empId === parseInt(IdFromUrl[2]));
    for (let i = 0; i < employeeVacList.length; i++) {
      let listVac = employeeVacList[i];
      const listVacStartDate = new Date(listVac.startDate);
      const listVacEndDate = new Date(listVac.endDate);
      if (
        (startDateLong <= listVacEndDate && startDateLong >= listVacStartDate) ||
        (endDateLong >= listVacStartDate && endDateLong <= listVacEndDate)
      ) {
        approved = false;
        alert("Overlap found in dates");
        break;
      }
    }
    if (newVac.endDate < startDateLong) {
      approved = false;
      alert("Start date can't be after the end date of the vacation/ sick leave");
    } else if (startDateLong.getFullYear() !== currentYear || endDateLong.getFullYear() !== currentYear) {
      approved = false;
      alert("Enter the vacation on the current year");
    } else if (startDateLong > currentDate) {
      approved = false;
      alert("Vacations can't start in the future");
    } else if (currentEmp.remainingVacDays - (endDateLong - startDateLong) / (1000 * 3600 * 24) <= 0) {
      approved = false;
      alert("Employee doesn't have enough vacation days left for the length of this vacation");
    } else if (approved) {
      handleAddDate();
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
        <h1>{"Employee: " + currentEmp.fullname + " ,ID: " + currentEmp.id} </h1>
        <Modal type="date" emp={currentEmp} sickDays={sickDaysCombined}></Modal>
        <h2>{"Vacation List: "}</h2>
        {vacList.length > 0 &&
          vacList.map((vac, index) => {
            return (
              <div key={index}>
                <p key={index}>
                  {"From: " + vac.startDate.slice(0, 10) + " To: " + vac.endDate.slice(0, 10)}{" "}
                  {vac.isSick ? "was a sick leave" : "was a vacation"}
                </p>
                {/* <button onClick={()=>handleDelete(vac.vacId)}>Delete vacation</button> */}
              </div>
            );
          })}
        <button onClick={() => setAddingVac(!addingVac)}>Add vacation/ sick leave</button>
        {addingVac && (
          <div className="vacEditContainer">
            <form onSubmit={onSubmit}>
              <p>Add dates of vacation:</p>
              <p>Start Date</p>
              <input type="date" name="startDate" onChange={handleChange} />
              <p>End Date</p>
              <input type="date" name="endDate" onChange={handleChange} />
              <p>Tick the box if the vacation is a *sick leave*</p>
              <input className="checkbox" type="checkbox" name="isSick" onChange={handleCheckbox} />
              <br />
              <button type="submit">
                <p>Add vacation</p>
              </button>
            </form>
          </div>
        )}
      </div>
    )
  );
};

export default Edit;
