import express, { query } from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  // host: "127.0.0.1",
  host: "localhost",
  user: "root",
  password: "TalVin13572022",
  // database: "hr_manager_data",
  database: "hr_manager"
});

app.use(express.json());
app.use(cors());

app.get("/employees", (req, res) => {
  const query = "SELECT * FROM employees";
  db.query(query, (error, data) => {
    if (error) {
      res.json(error);
    }
    res.json(data);
  });
});

app.get("/vacations", (req, res) => {
  const query = "SELECT * FROM dates";
  db.query(query, (error, data) => {
    if (error) {
      res.json(error);
    }
    res.json(data);
  });
});

app.post("/employees", (req, res) => {
  const query =
    "INSERT INTO employees (id,fullname,birthdate,employmentDate,remainingVacDays,address,phoneNumber,empPic) VALUES (?)";
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
  db.query(query, [values], (error, data) => {
    if (error) {
      return res.json(error);
    }
    return res.json("Employee has been added");
  });
});

app.listen(4000, () => {
  console.log("Connected to backend!");
});

app.delete("/employees/:id", (req, res) => {
  const employeeId = req.params.id;
  const query = "DELETE FROM employees WHERE id = ?";
  db.query(query, [employeeId], (error, data) => {
    if (error) {
      return res.json(error);
    }
    return res.json("Employee deleted!");
  });
});

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

app.get("/", (req, res) => {
  const query = "SELECT * FROM admins";
  db.query(query, (error, data) => {
    if (error) {
      res.json(error);
    }
    // Here extract the username and password from the request 
    // then its a simple IsIn function and return the result which will go inside logged in 
    // Good luck

    data.forEach(admin => {
      if(admin.username === req.username && admin.password === req.password){
        console.log("success!!!")
        return true;
      }
    });
    console.log("nooo!!!")
    return false;
    // res.json(data);
  });
});
