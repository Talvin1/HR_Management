import React, { useState, useEffect } from "react";
import Login from "./Pages/Login";
import EmployeesPage from "./Pages/EmployeesPage";
import Modal from "./components/Modal";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddPage from "./Pages/AddPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/employees" element={<EmployeesPage />}></Route>
          <Route path="/AddPage" element={<AddPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
    // <div>
    //   <Login>
    //     <BrowserRouter>
    //       <Routes>
    //         <Route path="/main" element={<Main />}></Route>
    //       </Routes>
    //     </BrowserRouter>
    //   </Login>
    // </div>
  );
};

export default App;
