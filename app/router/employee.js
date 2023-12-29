const express = require("express");
const router = express.Router();
const Employee = require("../model/employee");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

// Create Employee
const register = async (req, res) => {
  try {
    let data = req.body;
    if (data.password === data.confirmPassword) {
      delete data.confirmPassword;
      const employee = new Employee(data);
      await employee.save();
      res.send("Registration completed");
    }
  } catch (e) {
    if (e.code == 11000 && e.keyPattern.email) {
      res.status(409).send("Email Already exists");
    } else if (e.code == 11000 && e.keyPattern.phone) {
      res.status(409).send("Phone Number Already exists");
    } else {
      res.status(400).send(e);
    }
  }
};

// Get all Employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({}, { password: 0 });
    res.status(201).send(employees);
  } catch (err) {
    res.status(401).send(err);
  }
};

// Get Individual employee by id
const getEmployee = async (req, res) => {
  try {
    const _id = req.params.id;
    const employee = await Employee.findById({ _id });
    res.send(employee);
  } catch (err) {
    res.status(401).send(err);
  }
};

// Get Employee by cookies
const getEmp = async (req, res) => {
  try {
    res.send(req.employee);
  } catch (e) {
    res.status(400).send("Not a Valid User");
  }
};

// Update Employee
const updateEmployee = async (req, res) => {
  try {
    const _id = req.params.id;
    const upData = await Employee.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    res.send(upData);
  } catch (e) {
    res.status(401).send(e);
  }
};
// Update Employee
const updateEmployeePass = async (req, res) => {
  try {
    const _id = req.params.id;
    const { password } = req.body;
    const encrypt = await bcrypt.hash(password, 10);
    const upData = await Employee.findByIdAndUpdate(
      { _id },
      { password: encrypt },
      {
        new: true,
        runValidators: true,
      }
    );
    res.send(upData);
  } catch (e) {
    res.status(401).send(e);
  }
};

// Delete Employee
const delEmployee = async (req, res) => {
  try {
    const _id = req.params.id;
    const delEmp = await Employee.findByIdAndDelete({ _id });
    res.send(delEmp);
  } catch (err) {
    res.status(401).send(err);
  }
};

router.post("/register", register);
router.get("/employee", auth, getEmployees);
router.get("/employee/:id", auth, getEmployee);
router.get("/empdata", auth, getEmp);
router.patch("/employee/:id", auth, updateEmployee);
router.patch("/passupdate/:id", auth, updateEmployeePass);
router.delete("/employee/:id", auth, delEmployee);

module.exports = router;
