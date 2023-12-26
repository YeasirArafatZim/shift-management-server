const express = require("express");
const router = express.Router();
const Employee = require("../model/employee");

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

router.post("/register", register);

module.exports = router;
