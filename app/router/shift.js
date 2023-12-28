const express = require("express");
const router = express.Router();
const Shift = require("../model/shift");
const auth = require("../middleware/auth");

// Create Shift
const createShift = async (req, res) => {
  try {
    const shift = new Shift(req.body);
    const createShift = await shift.save();
    res.status(201).send(createShift);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get all Shifts
const getShifts = async (req, res) => {
  try {
    const shifts = await Shift.find({});
    res.status(201).send(shifts);
  } catch (err) {
    res.status(401).send(err);
  }
};

// Get Individual shift by id
const getShift = async (req, res) => {
  try {
    const _id = req.params.id;
    const shift = await Shift.findById({ _id });
    res.send(shift);
  } catch (err) {
    res.status(401).send(err);
  }
};

// Update Shift
const updateShift = async (req, res) => {
  try {
    const _id = req.params.id;
    const upData = await Shift.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    res.send(upData);
  } catch (e) {
    res.status(401).send(e);
  }
};

// Delete Shift
const delShift = async (req, res) => {
  try {
    const _id = req.params.id;
    const delShift = await Shift.findByIdAndDelete({ _id });
    res.send(delShift);
  } catch (err) {
    req.status(401).send(err);
  }
};

router.post("/shift", auth, createShift);
router.get("/shift", auth, getShifts);
router.get("/shift/:id", auth, getShift);
router.patch("/shift/:id", auth, updateShift);
router.delete("/shift/:id", auth, delShift);

module.exports = router;
