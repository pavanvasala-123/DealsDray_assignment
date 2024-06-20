const express = require("express");
require("dotenv").config();
const Dbconnection = require("./DBConnection/Dbconnection");
const router = require("./Routes/Routes");
const employee = require("./Routes/EmployeeRoutes");
const cors = require("cors");
const path = require('path')

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("home page");
});

app.use("/users", router);
app.use("/", employee);

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("listening to the port " + process.env.PORT);
  Dbconnection();
});

module.exports = app;
