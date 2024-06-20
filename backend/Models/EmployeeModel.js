const mongoose = require("mongoose");
const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  mobile: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  course: {
    type: Array,
    required: true,
  },
  img: {
    type: String,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
