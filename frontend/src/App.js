import Login from "./Pages/Login";
import EmployeesPage from "./Pages/EmployeesPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddPage from "./Pages/AddPage";
import Edit from "./Pages/Edit";
import VacEdit from "./Pages/VacEdit";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/employees" element={<EmployeesPage />}></Route>
        <Route path="/addPage" element={<AddPage />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
        <Route path="/editVac/:id" element={<VacEdit />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
