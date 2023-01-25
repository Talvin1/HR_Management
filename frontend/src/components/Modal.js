import React from "react";
import { Link } from "react-router-dom";
const Modal = (props) => {
  console.log(props.emp);
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
          <p>{"Employee Number: " + props.emp.id}</p>
          <p>{"Was hired on the " + props.emp.employmentDate}</p>
          <p>{"Has " + props.emp.remainingVacDays + " Remaining Vacation Days"}</p>
        </div>
        <div className="footer">
          <button onClick={() => <Link to="/edit"></Link>}>Edit employee's info</button>
          <button onClick={() => props.handleDelete(props.emp.id)}>Delete employee from database</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
