import Login from "./Pages/Login";
import EmployeesPage from "./Pages/EmployeesPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddPage from "./Pages/AddPage";
import Edit from "./Pages/Edit";
import UserContext from "./components/UserContext";
import { useMemo, useState } from "react";

const App = () => {
  // const [user, setUser] = useState(null);
  // const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          {/* <UserContext.Provider value={value}> */}
          <Route path="/employees" element={<EmployeesPage />}></Route>
          <Route path="/addPage" element={<AddPage />}></Route>
          <Route path="/edit/:id" element={<Edit />}></Route>
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
