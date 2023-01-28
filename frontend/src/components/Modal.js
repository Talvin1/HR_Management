import React from "react";
import { Link } from "react-router-dom";
const Modal = (props) => {

  const birthdateFormatted = props.emp.birthdate.slice(0,10);
  const employmentDateFormatted = props.emp.employmentDate.slice(0,10);

  const calcDiffInDays = (date) => {
    let diffDays;
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    date = new Date(date);
    const diffYears = currentDate.getFullYear() - date.getFullYear();
    const dateWithCurrentYear = date.setFullYear(currentYear);
    if(currentDate < dateWithCurrentYear){
      date = dateWithCurrentYear;
    }else{
      date.setFullYear(currentYear+1);
    }
    diffDays = parseInt((date - currentDate) / (1000 * 60 * 60 * 24), 10)+1;
    return [diffDays,diffYears];
  }
  return (
    props.type === "info" ?
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
          <p>{"Has " + calcDiffInDays(birthdateFormatted)[0] +" days until his " + calcDiffInDays(birthdateFormatted)[1] + " birthday"}</p>
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
          <button>
            <Link to={"/editVac/"+ props.emp.id}> Go to vacations data on employee</Link>
          </button>
          <button onClick={() => props.handleDelete(props.emp.id)}>Delete employee from database</button>
        </div>
      </div>
    </div> 
    :
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
          <p>{"Has " + props.emp.remainingVacDays + " Remaining Vacation Days"}</p>
          <p>{"Took " + (20-props.remainingVacDays) + " vacation days"}</p>
          <p>{"Took " + "sick leaves"}</p>
        </div>
        <div className="footer">
          <button>
            <Link to={"/editVac" + props.emp.id}>Add vacation/ edit vacation info </Link>
          </button>
        </div>
      </div>
    </div> 
  
  );
};

export default Modal;
