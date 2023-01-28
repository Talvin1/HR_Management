import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

const Edit = (props) => { 
  const [addingVac, setAddingVac] = useState(false);
  const [currentEmp, setCurrentEmp] = useState({});
  const [newVac, setNewVac] = useState({
    employeeId: [props.id],
    startDate: "",
    endDate: "",
    isSick: 0
  });
  const [vacList, setVacList] = useState([]);

  const navigate = useNavigate();
  
  let currentDate = new Date(); 
  const currentYear = currentDate.getFullYear()

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
          const res = await axios.get("http://localhost:4000/vacPage/" + IdFromUrl[2]);
          setVacList(res.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchEmployee();
    fetchAllVacs();
  }, []);

  const changeVacDays = (vac, action) =>{
    const startDateLong = new Date(vac.startDate);
    const endDateLong = new Date(vac.endDate);
    const daysOfVacation = (endDateLong - startDateLong)/ (1000 * 3600 * 24);
    let emp;
    if(action === '-'){
      emp = {...currentEmp, remainingVacDays: currentEmp.remainingVacDays - daysOfVacation};
      console.log(emp)
    }
    // else{
    //   emp = {...currentEmp, remainingVacDays: currentEmp.remainingVacDays + daysOfVacation};
    // }
    setCurrentEmp(emp)
    editEmpVacDaysLeft(emp);
  };


  const editEmpVacDaysLeft = async (emp) => {
    try {
      await axios.put("http://localhost:4000/employees/" + IdFromUrl[2], emp);
      navigate("/employees");
    } catch (error) {
      console.log(error);
    }
  }


  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete("http://localhost:4000/editVac/" + id);
  //     window.location.reload();
  //     changeVacDays(newVac, '+');
  //   } catch (error) {
  //   }
  // };


  const handleChange = (e) => {
    setNewVac((prevVac) => ({ ...prevVac, [e.target.name]: e.target.value }));
  };


  const handleCheckbox = (e) => {
    let isChecked = 0;
    if(e.target.checked){
      isChecked = 1;
    }
    setNewVac((prevVac) => ({ ...prevVac, [e.target.name]: isChecked }));
  }

  const handleAddDate = async (e) => {
    try {
      await axios.post("http://localhost:4000/editVac/"+ IdFromUrl[2], newVac);
      if(newVac.isSick === 0){
        changeVacDays(newVac, '-');
      }
      navigate("/employees");
    } catch (error) {
      console.log(error);
  };
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const startDateLong = new Date(newVac.startDate);
    const endDateLong = new Date(newVac.endDate);
    const employeeVacList = vacList.filter((vac) => vac.employeeId === IdFromUrl[2])
    employeeVacList.map((listVac) => {
    const listVacStartDate = new Date(listVac.startDate);
    const listVacEndDate = new Date(listVac.endDate);
    if((startDateLong <= listVacEndDate && startDateLong >= listVacStartDate) || (endDateLong >= listVacStartDate && endDateLong <= listVacEndDate)){
      alert("Overlap found in dates")
    }});
    if(newVac.endDate < startDateLong){
      alert("Start date can't be after the end date of the vacation/ sick leave")
    }else if(startDateLong.getFullYear() !== currentYear || endDateLong.getFullYear() !== currentYear){
      alert("Enter the vacation on the current year")
    } else if(startDateLong > currentDate){
      alert("Vacations can't start in the future")
    }else if((currentEmp.remainingVacDays - ((endDateLong - startDateLong)/ (1000 * 3600 * 24))) <= 0){
      alert("Employee doesn't have enough vacation days left for the length of this vacation")
    }else{
      handleAddDate();
    }
  }
  
  
  return (
  props.loggedIn &&
  <div>
    <h1>{"Employee: " + currentEmp.fullname + " ,ID: " + currentEmp.id} </h1>
    <h2>{"Vacation List: "}</h2>
    {vacList.map((vac, index) => {return(
      <div key={index}>
        <p key={index}>{"From: " + vac.startDate.slice(0,10) + " To: " + vac.endDate.slice(0,10)} {vac.isSick?"was a sick leave":"was a vacation"}</p>
        {/* <button onClick={()=>handleDelete(vac.vacId)}>Delete vacation</button> */}
      </div>
    )})}
    <button onClick={()=> setAddingVac(!addingVac)}>Add vacation/ sick leave</button>
    {addingVac &&
    <div>
      <form onSubmit={onSubmit}>
        <p>Add dates of vacation:</p>
        <h3>Disclaimer: date format is as follows: mm/dd/yyyy</h3>
        <p>Start Date</p>
        <input type="date" name="startDate" onChange={handleChange} />
        <p>End Date</p>
        <input type="date" name="endDate" onChange={handleChange} />
        <p>Tick the box if the vacation is a *sick leave*</p>
        <input type="checkbox" name="isSick" onChange={handleCheckbox}/>
        <button type="submit">Add vacation</button>
      </form>
    </div>}
  </div>
  );
};

export default Edit;
