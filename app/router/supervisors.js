const express = require("express");
const router = express.Router();
const Supervisor = require("../model/supervisors");

// Assign employee to a supervisor
const assignEmployee = async (req, res) => {
  try {
    const sup = new Supervisor(req.body);
    const assignEmp = await sup.save();
    res.status(201).send(assignEmp);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get all Employees with a supervisor by supId
const getSupEmps = async (req, res) => {
  try {
    const supId = req.params.id;
    const employees = await Supervisor.find({ supId }).populate("Employee");
    res.status(201).send(employees);
  } catch (err) {
    res.status(401).send(err);
  }
};

// Get Employee's supervisor
const getSupervisor = async (req, res) => {
  try {
    const empId = req.params.id;
    const supervisor = await Supervisor.findOne({ empId }).populate("Employee");
    res.send(supervisor);
  } catch (err) {
    res.status(401).send(err);
  }
};

// Update Supervisor
const updateSupervisor = async (req, res) => {
  try {
    const empId = req.params.id;
    const upData = await Supervisor.findOneAndUpdate(empId, req.body, {
      new: true,
      runValidators: true,
    });
    res.send(upData);
  } catch (e) {
    res.status(401).send(e);
  }
};

router.post("/assignemp", assignEmployee);
router.get("/supemps/:id", getSupEmps);
router.get("/sup/:id", getSupervisor);
router.patch("/updatesup", updateSupervisor);

module.exports = router;
