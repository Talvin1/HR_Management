import React from "react";
import { Link } from "react-router-dom";
const Modal = (props) => {

  const birthdateFormatted= props.emp.birthdate.slice(0,10);
  const employmentDateFormatted= props.emp.employmentDate.slice(0,10);

  const calcDiffInDays = (date) => {
    let diffDays = 0;
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    date = new Date(date);
    const diffYears = currentDate.getFullYear() - date.getFullYear();
    if(currentDate > date){
      date.setYear(currentYear);
      console.log("1: " + date)
    }else{
      date.setYear(currentYear+1);
      console.log("2: " + date)
    }
    diffDays = parseInt((date - currentDate) / (1000 * 60 * 60 * 24), 10)+1;
    return [diffDays,diffYears];
  }
  calcDiffInDays(employmentDateFormatted);
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button className="close" onClick={props.closeModal}>
          X
        </button>
        <div className="title">
          <h1>{props.emp.fullname}</h1>
        </div>
        <div className="body">
          <img src={props.emp.empPic} />
          <p>{"Employee'd identification number: " + props.emp.id}</p>
          <p>{"Was born on the " + birthdateFormatted}</p>
          <p>{"Has " + calcDiffInDays(birthdateFormatted)[0] +" days until birthday"}</p>
          <p>{"Was hired on the " + employmentDateFormatted}</p>
          <p>{"Has " + calcDiffInDays(employmentDateFormatted)[0] + " days until the employee's been " + calcDiffInDays(employmentDateFormatted)[1] + " years in the company"}</p>
          <p>{"Has " + props.emp.remainingVacDays + " Remaining Vacation Days"}</p>
          <p>{"Lives at " + props.emp.address}</p>
          <p>{"Employee's personal phone number is: " + props.emp.phoneNumber}</p>
        </div>
        <div className="footer">
          <button>
            <Link to={"/edit/" + props.emp.id}>Edit employee's info</Link>
          </button>
          <button onClick={() => props.handleDelete(props.emp.id)}>Delete employee from database</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
