const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require('path')

const {
  createEmployee,
  getEmployees,
  updateEmployee,
  getEmployeeById
} = require("../Controllers/EmployeeController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/create-employee", upload.single("img"), createEmployee);

router.get("/get-employees", getEmployees);

router.post("/update-employee/:id",updateEmployee)
router.get("/getemployee/:id",getEmployeeById)

module.exports = router;
