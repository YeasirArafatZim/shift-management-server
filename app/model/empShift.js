const mongoose = require("mongoose");

const empShiftSchema = new mongoose.Schema({
  empId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  shiftId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shift",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const EmpShift = new mongoose.model("EmpShift", empShiftSchema);

module.exports = EmpShift;
