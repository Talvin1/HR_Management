import React from "react";
import { Link } from "react-router-dom";
const Modal = (props) => {
  // const date = new Date();
  // const day = date.getDate();
  // const month = date.getMonth() + 1;
  // const year = date.getFullYear();
  // const currentDate = new Date().toJSON().slice(0, 10);
  // const upcomingBirthday = new Date(props.emp.birthdate);
  // console.log(props.emp.birthdate);
  // // const daysTillBirthday = c
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
          <p>{"Was born on the " + props.emp.birthdate}</p>
          {/* <p>{"Has " + +"days until birthday"}</p> */}
          <p>{"Was hired on the " + props.emp.employmentDate}</p>
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
