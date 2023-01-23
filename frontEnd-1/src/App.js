import React, { useState, useEffect } from "react";
import Login from "./Pages/Login";
import EmployeesPage from "./Pages/EmployeesPage";
import Modal from "./components/Modal";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/employees" element={<EmployeesPage />}></Route>
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
