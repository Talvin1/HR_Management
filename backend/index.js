import express, { query } from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const loginQuery = "SELECT username, password FROM admins";
const getAllEmpQuery =
  "SELECT id, fullname, birthdate, employmentDate, remainingVacDays, address, phoneNumber, empPic FROM employees";
const getSpecificEmpQuery =
  "SELECT id, fullname, birthdate, employmentDate, remainingVacDays, address, phoneNumber, empPic FROM employees WHERE id = ?";
const getAllEmpVacsQuery = "SELECT vacId, empId, startDate, endDate, isSick FROM dates WHERE empId = ?";
const insertNewVacQuery = "INSERT INTO dates (empId, startDate, endDate, isSick) VALUES (?)";
const insertNewEmpQuery =
  "INSERT INTO employees (id,fullname,birthdate,employmentDate,remainingVacDays,address,phoneNumber,empPic) VALUES (?)";
const deleteEmpQuery = "DELETE FROM employees WHERE id = ?";

//Established the connection to the db in MySQL
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "TalVin13572022",
  database: "hr_manager_data",
});

// Cors is making your server accessible to any domain that requests something from the server via a browser, and express parses incoming JSON requests and puts the parsed data in the req field
app.use(express.json());
app.use(cors());

// Returns all the employees from the table to show in EmployeesPage
app.get("/employees", (req, res) => {
  db.query(getAllEmpQuery, (error, data) => {
    if (error) {
      res.json(error);
    }
    res.json(data);
  });
});

app.get("/employees/:id", (req, res) => {
  const employeeId = req.params.id;
  db.query(getSpecificEmpQuery, [employeeId], (error, data) => {
    if (error) {
      res.json(error);
    }
    res.json(data);
  });
});

// Returns all the vacations/sick leaves from the table to show in VacationsPage
app.get("/editVac/:id", (req, res) => {
  const employeeId = req.params.id;
  db.query(getAllEmpVacsQuery, [employeeId], (error, data) => {
    if (error) {
      res.json(error);
    }
    res.json(data);
  });
});

// Takes all the employee's vacations/sick leave info from the request and inserts it into the dates table
app.post("/editVac/:id", (req, res) => {
  const values = [req.params.id, req.body.startDate, req.body.endDate, req.body.isSick];
  db.query(insertNewVacQuery, [values], (error, data) => {
    if (error) {
      return res.json(error);
    }
    return res.json("Vacation/sick leave has been added");
  });
});

// Takes all the employee's info from the request and inserts it into the employees table
app.post("/employees", (req, res) => {
  const values = [
    req.body.id,
    req.body.fullname,
    req.body.birthdate,
    req.body.employmentDate,
    req.body.remainingVacDays,
    req.body.address,
    req.body.phoneNumber,
    req.body.empPic,
  ];
  db.query(insertNewEmpQuery, [values], (error, data) => {
    if (error) {
      return res.json(error);
    }
    return res.json("Employee has been added");
  });
});

// Logs to the console when the connection is up and running
app.listen(4000, () => {
  console.log("Connected to backend!");
});

// takes the id of the employee from the url of the page and deletes the employee from the table
app.delete("/employees/:id", (req, res) => {
  const employeeId = req.params.id;
  db.query(deleteEmpQuery, [employeeId], (error, data) => {
    if (error) {
      return res.json(error);
    }
    return res.json("Employee deleted!");
  });
});

// takes the id of the employee from the url of the page and deletes the employee from the table
// app.delete("/editVac/:id", (req, res) => {
//   const vacId = req.params.id;
//   db.query(deleteVacQuery, [vacId], (error, data) => {
//     if (error) {
//       return res.json(error);
//     }
//     return res.json("Vacation deleted!");
//   });
// });

// Takes all the employee's info from the request and updates the employee in the table based on the id of the employee it got from the request
app.put("/employees/:id", (req, res) => {
  const employeeId = req.params.id;
  const query =
    "UPDATE employees SET fullname = ?, birthdate = ?, employmentDate = ?, remainingVacDays = ?, address = ?, phoneNumber = ?, empPic = ? WHERE id = ?";
  const values = [
    req.body.fullname,
    req.body.birthdate,
    req.body.employmentDate,
    req.body.remainingVacDays,
    req.body.address,
    req.body.phoneNumber,
    req.body.empPic,
  ];
  db.query(query, [...values, employeeId], (error, data) => {
    if (error) {
      return res.json(error);
    }
    return res.json("Employee updated Successfully!");
  });
});

//Checks all the username:password objects (users) from the table in the db and return a boolean if the given input from the user is in the admins table
app.post("/login", (req, res) => {
  db.query(loginQuery, (error, data) => {
    if (error) {
      return res.json(error);
    }
    data.map((admin) => {
      return res.json(req.body.username === admin.username && admin.password === req.body.password);
    });
  });
});
