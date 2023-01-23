import React from "react";

const Modal = (props) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button className="close" onClick={props.closeModal}>
          X
        </button>
        <div className="title">
          <h1>{props.emp.fullName}</h1>
        </div>
        <div className="body">
          <p>{"Employee Number: " + props.emp.id}</p>
          <p>{"Has " + props.emp.remainingVacDays + " Free Days,"}</p>
          <p>{"Was hired on the " + props.emp.employementDate}</p>
          <p>{"Has " + props.emp.remainingSickDays + " Remaining Sick Days"}</p>
        </div>
        <div className="footer">
          <button onClick={props.closeModal}>Edit employee's info</button>
          <button onClick={() => props.handleDelete(props.emp.id)}>Delete employee from database</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;