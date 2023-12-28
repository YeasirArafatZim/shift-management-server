const express = require("express");
const router = express.Router();
const Employee = require("../model/employee");
const auth = require("../middleware/auth");

// All supervisors
const getSupervisors = async (req, res) => {
  try {
    const sups = await Employee.find({ role: "Supervisor" });
    res.send(sups);
  } catch (err) {
    res.status(401).send(err);
  }
};
//Delete supervisor for a employee
const delSup = async (req, res) => {
  try {
    const _id = req.params.id;
    const upData = await Employee.findByIdAndUpdate(
      { _id },
      { $unset: { supervisor: 1 } },
      {
        new: true,
        runValidators: true,
      }
    );
    res.send(upData);
  } catch (e) {
    res.status(401).send(err);
  }
};

// All Employees for a supervisor
const allEmp = async (req, res) => {
  try {
    const _id = req.employee._id;
    const emp = await Employee.find({ "supervisor.id": _id });
    res.send(emp);
  } catch (e) {
    res.status(401).send(err);
  }
};

router.get("/getsups", auth, getSupervisors);
router.patch("/delempsup/:id", auth, delSup);
router.get("/allemp", auth, allEmp);
module.exports = router;
