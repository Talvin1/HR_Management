import Login from "./Pages/Login";
import EmployeesPage from "./Pages/EmployeesPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddPage from "./Pages/AddPage";
import Edit from "./Pages/Edit";
import {useState} from 'react'
import VacationsPage from "./Pages/VacationsPage";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setLoggedIn={setLoggedIn}/>}></Route>
          {/* <UserContext.Provider value={value}> */}
          <Route path="/employees" element={<EmployeesPage loggedIn={loggedIn}/>}></Route>
          <Route path="/addPage" element={<AddPage loggedIn={loggedIn}/>}></Route>
          <Route path="/edit/:id" element={<Edit loggedIn={loggedIn}/>}></Route>
          <Route path="/vacPage" element={<VacationsPage loggedIn={loggedIn}/>}></Route>
          {/* </UserContext.Provider> */}
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
