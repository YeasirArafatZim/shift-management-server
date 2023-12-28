const express = require("express");
const router = express.Router();
const EmpShift = require("../model/empShift");
const auth = require("../middleware/auth");

// Assign Shifts
const assignShift = async (req, res) => {
  try {
    const empShift = new EmpShift(req.body);
    const assign = await empShift.save();
    res.status(201).send(assign);
  } catch (err) {
    res.status(400).send(err);
  }
};

// return shift for empId & date
const getEmpShift = async (req, res) => {
  try {
    let data = req.body;
    const shift = await EmpShift.findOne({
      empId: data.empId,
      date: data.date,
    }).populate("shiftId");
    res.send(shift);
  } catch (e) {
    res.status(400).send(e);
  }
};

// Update Employee Shift
const updateEmpShift = async (req, res) => {
  try {
    const data = req.body;
    const upData = await EmpShift.findOneAndUpdate(
      { empId: data.empId, date: data.date },
      { shiftId: data.shiftId },
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

router.post("/assignshift", auth, assignShift);
router.post("/getEmpShift", auth, getEmpShift);
router.patch("/updateEmpShift", updateEmpShift);

module.exports = router;