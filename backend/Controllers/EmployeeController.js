const Employee = require("../Models/EmployeeModel");

const createEmployee = async (req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;
  const img = req.file ? req.file.path : null;
  // console.log(img);
  const requiredFields = [
    "name",
    "email",
    "mobile",
    "designation",
    "gender",
    "course",
    "img",
  ];
  const errors = [];

  requiredFields.forEach((field) => {
    if (!req.body[field] && field !== "img") {
      errors.push(`${field} is required`);
    }
  });

  if (!img) {
    errors.push("img is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Validate required fields
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const validatePhoneNumberRegex = /^\+?[1-9][0-9]{7,14}$/;

  if (!validatePhoneNumberRegex.test(mobile)) {
    return res.status(400).json({ error: "Invalid mobile number" });
  }

  // Password validation (at least 8 characters, one uppercase, one lowercase, one number)

  try {
    // Check if user already exists
    const user = await Employee.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Employee already created" });
    }

    // Create a new user
    const createUser = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      img,
    });
    await createUser.save();

    res.status(201).json({ user: createUser });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};






const getEmployees = async (req, res) => {
  const { sortBy = 'name', order = 'asc', search = '', page = 1, limit = 10 } = req.query;
  const sortOrder = order === 'asc' ? 1 : -1;
  const sortCriteria = {};
  sortCriteria[sortBy] = sortOrder;

  const searchCriteria = {
    $or: [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      // Add more search criteria if needed
    ],
  };

  try {
    const totalCount = await Employee.countDocuments(searchCriteria);
    const totalPages = Math.ceil(totalCount / limit);

    const employees = await Employee.find(searchCriteria)
      .sort(sortCriteria)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      totalCount,
      totalPages,
      currentPage: parseInt(page),
      employees,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEmployeeById = async (req, res) => {
  const { id } = req.params; // Assuming id is passed as a route parameter

  try {
    // Find employee by ID in the database
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // If employee found, return the employee data
    res.status(200).json({ employee });
  } catch (error) {
    console.error('Error fetching employee by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateEmployee = async (req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;
  const img = req.file ? req.file.path : null;
  // console.log(img);
  const requiredFields = [
    "name",
    "email",
    "mobile",
    "designation",
    "gender",
    "course",
    "img",
  ];
  const errors = [];

  // requireFields.forEach((field) => {
  //   if (!req.body[field]) {
  //     errors.push(`${field} is required`);
  //   }
  // });

  requiredFields.forEach((field) => {
    if (!req.body[field] && field !== "img") {
      errors.push(`${field} is required`);
    }
  });

  if (!img) {
    errors.push("img is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Validate required fields
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const validatePhoneNumberRegex = /^\+?[1-9][0-9]{7,14}$/;

  if (!validatePhoneNumberRegex.test(mobile)) {
    return res.status(400).json({ error: "Invalid mobile number" });
  }

  // Password validation (at least 8 characters, one uppercase, one lowercase, one number)

  try {
    // Check if user already exists
    const user = await Employee.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Employee already created" });
    }

    // Create a new user
    const createUser = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      img,
    });
    await createUser.save();

    res.status(201).json({ user: createUser });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};





module.exports = { createEmployee, getEmployees, updateEmployee,getEmployeeById};
