import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "TalVin13572022",
  database: "hr_manager_data",
});

app.get("/", (req, res) => {
  res.json("siiiii!!!!!");
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

app.post("/addEmp", (req, res) => {
  const query =
    "INSERT INTO employees ('id', 'fullname', 'birthdate', 'employementDate', 'remainingVacDays', 'remainingSickDays', 'vacDates') VALUES (?)";
  const values = [];
  db.query(query, (error, data) => {
    if (error) {
      res.json(error);
    }
    res.json(data);
  });
});

app.listen(4000, () => {
  console.log("Connected to backend!");
});
